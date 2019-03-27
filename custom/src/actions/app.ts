import { APP_MENU_LIST } from '../constants/app';
import { createAction } from '../libs/redux';

/**
 * 设置菜单
 * @param role 
 */
export const dispatchSetMenu = (role: number) => createAction(APP_MENU_LIST, { role });
