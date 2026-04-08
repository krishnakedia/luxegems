export interface Product {
  p_id: number;
  p_slid: string;
  p_catid: string;
  p_scatid: string;
  p_scname: string;
  p_name: string;
  p_code: string;
  p_price: string;
  p_discount: string;
  p_weight: number;
  p_description: string;
  p_date: string;
  p_status: number;
  category_name?: string;
  images?: ProductImage[];
  colors?: ProductColor[];
  sizes?: ProductSize[];
  shades?: Shade[];
  sub_products?: SubProduct[];
  stock?: number;
  rating?: number;
  review_count?: number;
}

export interface ProductImage {
  pm_id: number;
  pm_pid: string;
  pm_image: string;
  pm_status: string;
}

export interface ProductColor {
  pclr_id: number;
  pclr_pid: string;
  pclr_name: string;
  pclr_image: string;
  pclr_status: string;
}

export interface ProductSize {
  ps_id: number;
  ps_pid: string;
  ps_size: string;
  ps_status: string;
}

export interface Shade {
  as_id: number;
  as_pid: string;
  as_name: string;
  as_color: string;
  as_img: string;
  as_price: string;
  as_date: string;
}

export interface SubProduct {
  sp_id: number;
  sp_pid: number;
  sp_name: string;
  sp_price: number;
  sp_weight: number;
  sp_quantity: number;
  sp_discount: number;
  sp_status: number;
  sp_date: string;
}

export interface Category {
  cat_id: number;
  cat_name: string;
  cat_seq: string;
  cat_image: string;
  cat_status: string;
  cat_date: string;
  products?: Product[];
}

export interface SubCategory {
  scat_id: number;
  scat_catid: string;
  scat_name: string;
  scat_image: string;
  scat_status: string;
  scat_date: string;
}

export interface User {
  nu_id: number;
  nu_name: string;
  nu_number: string;
  nu_email: string;
  nu_status: number;
  nu_date: string;
  nu_address: string;
}

export interface Order {
  order_id: number;
  order_nuid: string;
  order_total: string;
  order_amount: string;
  order_uid: string;
  order_shipid: string;
  order_dcharges: string;
  order_type: string;
  order_status: string;
  order_payment: string;
  order_date: string;
  order_cty: number;
  shipping?: ShippingDetails;
  items?: OrderItem[];
  user?: User;
}

export interface OrderItem {
  cd_id: number;
  cd_coid: string;
  cd_pid: string;
  cd_price: string;
  cd_qty: string;
  cd_netprice: string;
}

export interface ShippingDetails {
  spp_id: number;
  spp_nuid: string;
  spp_email: string;
  spp_name: string;
  spp_number: string;
  spp_state: string;
  spp_city: string;
  spp_pin: string;
  spp_address: string;
  spp_landmark: string;
  spp_default: string;
  spp_status: string;
}

export interface CartItem {
  cp_id?: number;
  cp_pid: string;
  cp_poprice: string;
  cp_quantity: number;
  cp_discount: string;
  cp_total: string;
  product?: Product;
}

export interface Coupon {
  cc_id: number;
  cc_fdate: string;
  cc_tdate: string;
  cc_code: string;
  cc_amount: string;
  cc_maxamount: string;
  cc_status: string;
  cc_cdate: string;
}

export interface Review {
  re_id: number;
  re_pid: string;
  re_nuid: string;
  re_desc: string;
  re_title: string;
  re_name: string;
  re_image: string;
  re_status: string;
  re_date: string;
}

export interface SliderImage {
  img_id: number;
  img_title: string;
  img_name: string;
  img_status: string;
  img_date: string;
}

export interface State {
  st_id: number;
  st_cnid: string;
  st_name: string;
  st_code: string;
  st_status: string;
}

export interface City {
  cit_id: number;
  cit_distid: string;
  cit_stid: string;
  cit_cnid: string;
  cit_name: string;
  cit_dtime: string;
  cit_dcharge: string;
  cit_status: string;
}

export interface District {
  dist_id: number;
  dist_stid: string;
  dist_name: string;
}

export interface AdminUser {
  a_id: number;
  a_email: string;
  a_name: string;
  a_desig: string;
  a_phone: string;
  a_usertype: string;
  a_status: string;
}

export interface SiteSettings {
  sl_id: number;
  sl_flink: string;
  sl_tlink: string;
  sl_ylink: string;
  sl_ilink: string;
  del_charge: number;
  min_del: number;
}

export interface SeoMeta {
  page: string;
  title: string;
  description: string;
  keywords: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
