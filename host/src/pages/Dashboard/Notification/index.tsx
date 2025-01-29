import { BreadcrumbItem, Breadcrumbs, Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { DashboardRoutes } from "@/types/routes";
import { BellPlus, BellRing, CheckCheck, LucideIcon } from "lucide-react";

type NotificationCardProp = {
  icon: LucideIcon;
  time: string;
  title: string;
  description: string;
};

const notifcationArr: NotificationCardProp[] = [
  {
    icon: BellPlus,
    time: "Today 3:90pm",
    title: "title of notifcatio",
    description: "describtion of the notifications her",
  },
  {
    icon: BellPlus,
    time: "Yesterday 3:90pm",
    title: "title of notifcatio",
    description: "describtion of the notifications her",
  },
  {
    icon: BellPlus,
    time: "Monday 3:90pm",
    title: "title of notifcatio",
    description: "describtion of the notifications her",
  },
  {
    icon: BellPlus,
    time: "Sunday 3:90pm",
    title: "title of notifcatio",
    description: "describtion of the notifications her",
  },
  {
    icon: BellPlus,
    time: "Today 3:90pm",
    title: "title of notifcatio",
    description: "describtion of the notifications her",
  },
];

const NotificationCard = ({ icon: Icon, time, title, description }: NotificationCardProp) => {
  return (
    <div className="border border-grey_200 rounded-sm p-4 mb-3 shadow-sm even:bg-grey_100 cursor-pointer">
      <div className="flex gap-6 items-center">
        <div>
          <Icon className="text-xl text-shorttiee_primary" />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-grey_300 font-medium">{time}</p>
          <h3 className="text-base text-shorttiee_primary font-semibold">{title}</h3>
          <p className="text-md text-grey_300 font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};

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
        {notifcationArr.length === 0 ? (
          <div className="flex flex-col justify-center items-center mx-auto h-full space-y-8">
            <div className="p-4">
              <BellRing className="size-12 text-shorttiee_primary animate-ping" />
            </div>
            <div>
              <h3 className="text-xl text-shorttiee_primary font-medium">
                You dont have any notifications yet
              </h3>
            </div>
          </div>
        ) : (
          <div>
            <Button variant="light" startContent={<CheckCheck />}>
              Mark all as read
            </Button>
            {notifcationArr.map((notif, index) => (
              <NotificationCard
                key={index}
                icon={notif.icon}
                title={notif.title}
                time={notif.time}
                description={notif.description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
