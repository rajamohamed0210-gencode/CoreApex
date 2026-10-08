from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from apps.contacts.models import ContactLead
from apps.core.models import SiteSetting, TeamMember
from apps.projects.models import Project
from apps.services.models import Service
from apps.testimonials.models import Testimonial


User = get_user_model()


class AdminDashboardDataTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_superuser(
            username='dashboard-admin',
            email='dashboard-admin@example.test',
            password='StrongPass123!',
        )
        TeamMember.objects.create(name='Test member', role='Engineer', bio='Test bio')
        Service.objects.create(
            title='Test service',
            short_description='Short description',
            full_description='Full description',
        )
        Project.objects.create(title='Test project', short_description='Project description')
        ContactLead.objects.create(
            name='Test contact',
            email='contact@example.test',
            project_details='Project request',
        )
        Testimonial.objects.create(
            client_name='Test client',
            company_name='Test company',
            content='Testimonial content',
        )
        SiteSetting.objects.create(site_name='Test Core Apex')

    def authenticate(self):
        response = self.client.post(
            '/api/v1/admin-dashboard/auth/login/',
            {'username': 'dashboard-admin', 'password': 'StrongPass123!'},
            format='json',
        )
        self.assertEqual(response.status_code, 200)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['access']}")
        return response.data

    def test_login_and_dashboard_return_authoritative_model_counts(self):
        self.authenticate()

        me_response = self.client.get('/api/v1/admin-dashboard/auth/me/')
        dashboard_response = self.client.get('/api/v1/admin-dashboard/dashboard/')

        self.assertEqual(me_response.status_code, 200)
        self.assertEqual(dashboard_response.status_code, 200)
        self.assertEqual(dashboard_response.data['team_total'], TeamMember.objects.count())
        self.assertEqual(dashboard_response.data['services_total'], Service.objects.count())
        self.assertEqual(dashboard_response.data['projects_total'], Project.objects.count())
        self.assertEqual(dashboard_response.data['project_requests'], ContactLead.objects.count())
        self.assertEqual(dashboard_response.data['active_testimonials'], Testimonial.objects.filter(is_featured=True).count())

    def test_services_crud_updates_the_existing_service_table(self):
        self.authenticate()
        response = self.client.post(
            '/api/v1/admin-dashboard/services/',
            {
                'title': 'Created service',
                'short_description': 'Short description',
                'full_description': 'Full description',
            },
            format='json',
        )
        self.assertEqual(response.status_code, 201)
        service_id = response.data['id']

        update_response = self.client.patch(
            f'/api/v1/admin-dashboard/services/{service_id}/',
            {'is_featured': False},
            format='json',
        )
        self.assertEqual(update_response.status_code, 200)
        self.assertFalse(Service.objects.get(pk=service_id).is_featured)

        delete_response = self.client.delete(f'/api/v1/admin-dashboard/services/{service_id}/')
        self.assertEqual(delete_response.status_code, 204)
        self.assertFalse(Service.objects.filter(pk=service_id).exists())

    def test_team_project_contact_and_testimonial_crud_use_existing_tables(self):
        self.authenticate()
        resource_cases = [
            (
                '/api/v1/admin-dashboard/team/',
                {'name': 'Created member', 'role': 'Engineer', 'bio': 'Created bio'},
                {'is_active': False},
                TeamMember,
                'name',
                'Created member',
            ),
            (
                '/api/v1/admin-dashboard/projects/',
                {'title': 'Created project', 'short_description': 'Created project description'},
                {'is_published': False},
                Project,
                'title',
                'Created project',
            ),
            (
                '/api/v1/admin-dashboard/contacts/',
                {'name': 'Created contact', 'email': 'created@example.test', 'project_details': 'Created request'},
                {'status': 'contacted'},
                ContactLead,
                'name',
                'Created contact',
            ),
            (
                '/api/v1/admin-dashboard/testimonials/',
                {'client_name': 'Created client', 'company_name': 'Created company', 'content': 'Created testimonial'},
                {'is_featured': False},
                Testimonial,
                'client_name',
                'Created client',
            ),
        ]

        for endpoint, create_data, update_data, model, field, value in resource_cases:
            with self.subTest(endpoint=endpoint):
                create_response = self.client.post(endpoint, create_data, format='json')
                self.assertEqual(create_response.status_code, 201, create_response.data)
                record_id = create_response.data['id']
                self.assertTrue(model.objects.filter(pk=record_id, **{field: value}).exists())

                update_response = self.client.patch(f'{endpoint}{record_id}/', update_data, format='json')
                self.assertEqual(update_response.status_code, 200, update_response.data)

                delete_response = self.client.delete(f'{endpoint}{record_id}/')
                self.assertEqual(delete_response.status_code, 204)
                self.assertFalse(model.objects.filter(pk=record_id).exists())

    def test_refresh_works_without_access_token_and_logout_revokes_refresh(self):
        tokens = self.authenticate()
        self.client.credentials()

        refresh_response = self.client.post(
            '/api/v1/admin-dashboard/auth/refresh/',
            {'refresh': tokens['refresh']},
            format='json',
        )
        self.assertEqual(refresh_response.status_code, 200)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh_response.data['access']}")

        logout_response = self.client.post(
            '/api/v1/admin-dashboard/auth/logout/',
            {'refresh': tokens['refresh']},
            format='json',
        )
        self.assertEqual(logout_response.status_code, 200)
        self.client.credentials()
        revoked_response = self.client.post(
            '/api/v1/admin-dashboard/auth/refresh/',
            {'refresh': tokens['refresh']},
            format='json',
        )
        self.assertEqual(revoked_response.status_code, 401)

    def test_settings_update_uses_the_existing_site_setting(self):
        self.authenticate()
        response = self.client.patch(
            '/api/v1/admin-dashboard/settings/',
            {'site_name': 'Updated Core Apex'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(SiteSetting.objects.count(), 1)
        self.assertEqual(SiteSetting.objects.first().site_name, 'Updated Core Apex')