import i18next from "i18next";
import { FuseNavItemType } from "@fuse/core/FuseNavigation/types/FuseNavItemType";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import { authRoles } from "../auth";
import DocumentationNavigation from "../main/documentation/DocumentationNavigation";
import SettingsAppNavigation from "../main/apps/settings/SettingsAppNavigation";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
  {
    id: "dashboards",
    title: "Dashboards",
    type: "group",
    icon: "heroicons-outline:home",
    translate: "DASHBOARDS",
    children: [
      {
        id: "dashboards.project",
        title: "Overview",
        type: "item",
        icon: "heroicons-outline:clipboard-document-check",
        url: "/dashboards/project",
      },
      {
        id: "dashboards.analytics",
        title: "NCHE Analytics",
        type: "item",
        icon: "heroicons-outline:chart-pie",
        url: "/dashboards/analytics",
      },
      {
        id: "dashboards.institutions",
        title: "Institutions Management",
        type: "collapse",
        icon: "heroicons-outline:building-library",
        children: [
          {
            id: "institutions",
            title: "Institutions",
            type: "item",
            url: "/dashboards/institutions",
            end: true,
          },
          {
            id: "new-institutions",
            title: "New Institution",
            type: "item",
            url: "/dashboards/institutions/new",
          },
          {
            id: "indicators",
            title: "indicators",
            type: "item",
            // icon: 'heroicons-outline:building-library',
            url: "/dashboards/indicators",
          },
          {
            id: "institution-programmes",
            title: "Available programmes",
            type: "item",
            url: "/dashboards/accreditation-programmes",
          },
        ],
      },
      {
        id: "dashboards.programmes",
        title: "Programmes Management",
        type: "collapse",
        icon: "heroicons-outline:building-library",
        // url: '/dashboards/institutions',
        children: [
          {
            id: "hei-programmes",
            title: "programme accreditation",
            type: "item",
            url: "/dashboards/programmes-accreditations",
          },
        ],
      },
      {
        id: "dashboards.students",
        title: "Students Management",
        type: "collapse",
        icon: "heroicons-outline:academic-cap",
        children: [
          {
            id: "students",
            title: "Students",
            type: "item",
            url: "/dashboards/students",
            end: true,
          },
          {
            id: "apps.profile",
            title: "Students profile",
            type: "item",
            icon: "heroicons-outline:user-circle",
            url: "/apps/profile",
          },
          {
            id: "students-detail",
            title: "Student Detail",
            type: "item",
            url: "/dashboards/students/1/hamisa-mobeto",
          },
          {
            id: "new-student",
            title: "New Student",
            type: "item",
            url: "/dashboards/students/new",
          },
        ],
      },
      {
        id: "apps.academy",
        title: "Subjects",
        type: "item",
        icon: "heroicons-outline:light-bulb",
        url: "/apps/academy",
      },
      {
        id: "dashboards.facilities",
        title: "Facilities Management",
        type: "collapse",
        icon: "heroicons-outline:building-office-2",
        children: [
          {
            id: "facilities",
            title: "Facilities",
            type: "item",
            url: "/dashboards/facilities",
          },
          // {
          // 	id: 'facilities-products',
          // 	title: 'Facilities Products',
          // 	type: 'item',
          // 	url: '/dashboards/facilities/products',
          // 	end: true
          // },
          // {
          // 	id: 'facilities-detail',
          // 	title: 'Facilities Detail',
          // 	type: 'item',
          // 	url: '/dashboards/facilities/product/:id',
          // 	end: true
          // }
        ],
      },
      {
        id: "dashboards.staff",
        title: "Staff Management",
        type: "collapse",
        icon: "heroicons-outline:users",
        children: [
          {
            id: "staff",
            title: "Staff",
            type: "item",
            url: "/dashboards/staff",
          },
          // {
          // 	id: 'staff-products',
          // 	title: 'Staff Products',
          // 	type: 'item',
          // 	url: '/dashboards/staff/products',
          // 	end: true
          // },
          // {
          // 	id: 'staff-detail',
          // 	title: 'Staff Detail',
          // 	type: 'item',
          // 	url: '/dashboards/staff/product/:id',
          // 	end: true
          // }
        ],
      },
      {
        id: "dashboards.programmes-accreditation",
        title: "Programme Registration",
        type: "collapse",
        icon: "heroicons-outline:presentation-chart-line",
        children: [
          {
            id: "applications",
            title: "Programmes",
            type: "item",
            url: "/dashboards/facilities",
          },
          // {
          // 	id: 'facilities-products',
          // 	title: 'Application Detail',
          // 	type: 'item',
          // 	url: '/dashboards/facilities/products',
          // 	end: true
          // },
          // {
          // 	id: 'facilities-detail',
          // 	title: 'New Application',
          // 	type: 'item',
          // 	url: '/dashboards/facilities/product/:id',
          // 	end: true
          // }
        ],
      },
      {
        id: "dashboards.research",
        title: "Research Management",
        type: "collapse",
        icon: "heroicons-outline:rocket-launch",
        children: [
          {
            id: "research",
            title: "Research",
            type: "item",
            url: "/dashboards/research",
          },
          // {
          // 	id: 'research-products',
          // 	title: 'Research Products',
          // 	type: 'item',
          // 	url: '/dashboards/research/products',
          // 	end: true
          // },
          // {
          // 	id: 'research-detail',
          // 	title: 'Research Detail',
          // 	type: 'item',
          // 	url: '/dashboards/research/product/:id',
          // 	end: true
          // }
        ],
      },
      {
        id: "dashboards.studentAnalytics",
        title: "Analytics Management",
        type: "collapse",
        icon: "heroicons-outline:chart-bar",
        children: [
          {
            id: "studentAnalytics",
            title: "Student Analytics",
            type: "item",
            url: "/dashboards/student_analytics",
          },
          {
            id: "staffAnalytics",
            title: "Staff Analytics",
            type: "item",
            url: "/dashboards/staff_analytics",
          },
          {
            id: "institutionAnalytics",
            title: "Institutions Analytics",
            type: "item",
            url: "/dashboards/institution_analytics",
          },
          {
            id: "programmesAnalytics",
            title: "Programmes Analytics",
            type: "item",
            url: "/dashboards/programmes_analytics",
          },
        ],
      },
      {
        id: "dashboards.workflows",
        title: "Workflow Management",
        type: "item",
        icon: "heroicons-outline:square-3-stack-3d",
        url: "/dashboards/workflow-mgt",
      },
    ],
  },
  {
    id: "apps",
    title: "System Administration",
    subtitle: "Secondary Apps",
    type: "group",
    icon: "heroicons-outline:cube",
    children: [
      {
        id: "apps.calendar",
        title: "Calendar",
        subtitle: "3 upcoming events",
        type: "item",
        icon: "heroicons-outline:calendar",
        url: "/apps/calendar",
        translate: "CALENDAR",
      },
      {
        id: "apps.file-manager",
        title: "Document Management",
        type: "item",
        icon: "heroicons-outline:archive-box",
        url: "/apps/file-manager",
        end: true,
      },
      {
        id: "apps.tasks",
        title: "Task Management",
        subtitle: "12 remaining tasks",
        type: "item",
        icon: "heroicons-outline:check-circle",
        url: "/apps/tasks",
      },
      {
        id: "apps.notifications",
        title: "Notifications",
        type: "item",
        icon: "heroicons-outline:bell",
        url: "/apps/notifications",
      },
      {
        ...SettingsAppNavigation,
        type: "item",
        badge: {
          title: "NEW",
        },
      },
    ],
  },
];

export default navigationConfig;
