import { motion } from 'motion/react'
import {
  BriefcaseBusiness,
  Image,
  Layers3,
  MessageSquare,
  Settings,
  Star,
  UserRoundCog,
  Users,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const modules = [
  {
    title: 'Team',
    description: 'Manage team members and founder profiles.',
    icon: Users,
    hueA: 215,
    hueB: 205,
    path: '/admin/team',
  },
  {
    title: 'Projects',
    description: 'Track incoming project requests and client work.',
    icon: BriefcaseBusiness,
    hueA: 205,
    hueB: 195,
    path: '/admin/projects',
  },
  {
    title: 'Contacts',
    description: 'Manage customer messages and enquiries.',
    icon: MessageSquare,
    hueA: 195,
    hueB: 185,
    path: '/admin/contacts',
  },
  {
    title: 'Services',
    description: 'Manage the services displayed on Core Apex.dev.',
    icon: Layers3,
    hueA: 225,
    hueB: 210,
    path: '/admin/services',
  },
  {
    title: 'Testimonials',
    description: 'Manage customer testimonials and visibility.',
    icon: Star,
    hueA: 45,
    hueB: 30,
    path: '/admin/testimonials',
  },
  {
    title: 'Media',
    description: 'Manage uploaded website media and image assets.',
    icon: Image,
    hueA: 195,
    hueB: 175,
    path: '/admin/settings',
  },
  {
    title: 'Admin Users',
    description: 'Manage dashboard access and user permissions.',
    icon: UserRoundCog,
    hueA: 230,
    hueB: 215,
    path: '/admin/users',
  },
  {
    title: 'Settings',
    description: 'Manage dashboard and system settings.',
    icon: Settings,
    hueA: 220,
    hueB: 200,
    path: '/admin/settings',
  },
]

function hue(value) {
  return `hsl(${value}, 82%, 58%)`
}

const cardVariants = {
  offscreen: {
    y: 80,
    opacity: 0,
    scale: 0.96,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.25,
      duration: 0.8,
    },
  },
}

export default function ScrollTriggeredModules() {
  const navigate = useNavigate()

  return (
    <section className="scroll-modules-section" aria-label="Core Apex module navigation">
      <div className="scroll-modules-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="scroll-modules-eyebrow">Core Apex.dev control center</p>
          <h2>Manage your business from one place</h2>
          <p className="scroll-modules-copy">
            Quickly access the most important areas of your Core Apex.dev business platform.
          </p>
        </motion.div>
      </div>

      <div className="scroll-modules-grid">
        {modules.map((module, index) => (
          <AnimatedModuleCard
            key={module.title}
            module={module}
            index={index}
            onNavigate={navigate}
          />
        ))}
      </div>
    </section>
  )
}

function AnimatedModuleCard({ module, index, onNavigate }) {
  const Icon = module.icon
  const background = `linear-gradient(145deg, ${hue(module.hueA)}, ${hue(module.hueB)})`

  return (
    <motion.article
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.35 }}
      variants={cardVariants}
      transition={{ delay: index * 0.06 }}
      className="module-card-wrap"
    >
      <motion.button
        type="button"
        onClick={() => onNavigate(module.path)}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="module-card"
      >
        <motion.div
          className="module-hero"
          style={{ background }}
          initial={{ opacity: 0.72, scale: 1 }}
          whileHover={{ opacity: 0.95, scale: 1.04 }}
          transition={{ duration: 0.35 }}
        />

        <div className="module-card-content">
          <div className="module-card-header">
            <motion.div
              whileHover={{ rotate: -5, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="module-icon"
            >
              <Icon size={20} strokeWidth={2} />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, x: 8 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="module-status"
            >
              Open
            </motion.span>
          </div>

          <div className="module-copy">
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </div>

          <motion.div
            className="module-divider"
            initial={{ scaleX: 0.7, transformOrigin: 'left' }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />

          <div className="module-footer">
            <span>Core Apex.dev</span>
            <motion.span whileHover={{ x: 4 }} className="module-link">
              Manage →
            </motion.span>
          </div>
        </div>
      </motion.button>
    </motion.article>
  )
}
