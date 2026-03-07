# 🦇🏴‍☠️ Component Architecture Plan

> **Mission:** Build a MERN Stack Dashboard from scratch.  
> **Status:** In Progress  
> **Stack:** React, Tailwind, shadcn/ui, daisyUI

---

## 1. 🧭 Layout & Navigation
| Status | Component | Stack | Notes |
| :---: | :--- | :--- | :--- |
| - [ ] | Sidebar, Navbar, Drawer | `shadcn/ui` + `daisyUI` | `shadcn add sidebar navbar sheet` + daisyUI drawer classes |
| - [ ] | Breadcrumbs | `shadcn/ui` | `shadcn add breadcrumb` |

## 2. 📊 Dashboard
| Status | Component | Stack | Notes |
| :---: | :--- | :--- | :--- |
| - [ ] | Project Cards, Stats Cards | `shadcn/ui` (Card) + `daisyUI` | Very easy with Card + Badge |
| - [ ] | Recent Activity | `shadcn/ui` (Timeline/List) | Custom but fast implementation |

## 3. 📋 Task Management
| Status | Component | Stack | Notes |
| :---: | :--- | :--- | :--- |
| - [ ] | Task Card | `shadcn/ui` (Card + Badge + Avatar) | Add `framer-motion` for drag effects |
| - [ ] | Kanban Board (draggable) | `shadcn/ui` + `@hello-pangea/dnd` | Use shadcn Card inside draggable columns |
| - [ ] | Task List / Table | `shadcn/ui` Table + `@tanstack/react-table` | Perfect sortable/filterable table |
| - [ ] | Calendar / Date Picker | `shadcn/ui` (Calendar + Popover) | Built-in, beautiful |

## 4. 📝 Forms & Inputs
| Status | Component | Stack | Notes |
| :---: | :--- | :--- | :--- |
| - [ ] | All forms (Input, Select, etc.) | `shadcn/ui` Form + `RHF` + `Zod` | `shadcn add form input select textarea` |
| - [ ] | Create/Edit Modals | `shadcn/ui` Dialog + Form | Reusable modal component |
| - [ ] | Assignee / Multi-select | `shadcn/ui` Command + Popover | Command palette style (very modern) |

## 5. 🖥️ Data Display
| Status | Component | Stack | Notes |
| :---: | :--- | :--- | :--- |
| - [ ] | Data Tables (advanced) | `shadcn/ui` Table + `@tanstack/react-table` | Best in class |
| - [ ] | Avatars, Badges, Status Pills | `shadcn/ui` + `daisyUI` | `shadcn add avatar badge` |
| - [ ] | Progress Bars | `shadcn/ui` Progress | `shadcn add progress` |

## 6. 💡 Feedback & UX
| Status | Component | Stack | Notes |
| :---: | :--- | :--- | :--- |
| - [ ] | Toasts / Notifications | `sonner` | Best looking toasts |
| - [ ] | Tooltips, Hover Effects | `shadcn/ui` Tooltip + `framer-motion` | Built-in |
| - [ ] | Loading Skeletons, Empty States | `shadcn/ui` Skeleton | `shadcn add skeleton` |
| - [ ] | Smooth Animations & Drag | `framer-motion` | Drag tasks, modal entrance |

## 7. 👥 Team & User
| Status | Component | Stack | Notes |
| :---: | :--- | :--- | :--- |
| - [ ] | User Avatars & Member List | `shadcn/ui` Avatar | With tooltips |
| - [ ] | Role Badges | `shadcn/ui` Badge | Color variants |

## 8. 🎨 Icons Everywhere
| Status | Component | Stack | Notes |
| :---: | :--- | :--- | :--- |
| - [ ] | All icons (plus, check, user, etc.) | `lucide-react` | Install once, use everywhere |

---
> **Note:** Update this file as you progress. If you change a stack, update the plan. **Adaptability is key.**