import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { DashboardRoutes } from '@/types/routes'

export default function Notification(): JSX.Element {
  return (
    <div className="py-6 space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={DashboardRoutes.home}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Notification</BreadcrumbItem>
      </Breadcrumbs>

      <div className="space-y-4">
        notifications
      </div>
    </div>

  )
}
