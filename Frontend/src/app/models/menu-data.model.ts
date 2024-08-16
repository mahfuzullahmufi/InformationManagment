export interface MenuData {
  id: number;
  menuName: string;
  url: string;
  icon: string;
  orderNo: number;
  parentId: number;
  isParent: boolean;
  isActive: boolean;
  roleId: string[];
  userId: string;
}