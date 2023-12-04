const URL = process.env.HTTPS_URL;
// user
export const api_get_User = `${URL}/api/user/name`;
export const api_get_UserListAll = `${URL}/api/user/list-all`;
export const api_get_UserCreate = `${URL}/api/user/create`;
export const api_get_UserProfile = `${URL}/api/user/profile`;
export const api_post_UserUpdate = `${URL}/api/user/update`;
export const api_post_UserThongBao = `${URL}/api/thong-bao/user`;
// nhan vien
export const api_get_Nv = `${URL}/api/nhan-vien/list-name`;
export const api_get_NvList = `${URL}/api/nhan-vien/list`;
export const api_post_NvCreate = `${URL}/api/nhan-vien/create`;
// admin
export const api_get_ThongBaoAdmin = `${URL}/api/thong-bao/admin`;
export const api_get_TrangThaiAdmin = `${URL}/api/trang-thai/list-r`;
export const api_get_ListAllHoaDon = `${URL}/api/hoa-don/list-all`;
export const api_post_HoaDonUpdateStatus = `${URL}/api/hoa-don/update-status`;
export const api_post_HoaDonUpdatePay = `${URL}/api/hoa-don/update-pay`;
// category
export const api_post_CategoryCreate = `${URL}/api/category-types/create`;
export const api_post_CategoryEdit = `${URL}/api/category-types/edit`;
export const api_post_CategoryDestroy = `${URL}/api/category-types/destroy`;
export const api_post_TypeProductCreate = `${URL}/api/product-types/create`;
export const api_post_TypeProductEdit = `${URL}/api/product-types/edit`;
export const api_post_TypeProductDelete = `${URL}/api/product-types/destroy`;
export const api_get_CategoryLSP = `${URL}/api/category-types/list-id`;

// products
export const api_get_ListProduct = `${URL}/api/product/list`;
export const api_get_ListProductAdmin = `${URL}/api/product/all`;
export const api_get_ListProductAllAdmin = `${URL}/api/product/list-all`;
export const api_get_ProductDetail = `${URL}/api/product/`;
export const api_get_ProductEdit = `${URL}/api/product/`;
export const api_post_ProductCreate = `${URL}/api/product/create`;
export const api_post_ProductUpdate = `${URL}/api/product/update`;
export const api_delete_ProductDelete = `${URL}/api/product/destroy`;
export const api_get_TypeProduct = `${URL}/api/product-types/list`;
export const api_get_Category = `${URL}/api/category-types/list`;
export const api_get_ProductListId = `${URL}/api/product/list-id`;

// cart
export const api_get_MyCart = `${URL}/api/cart/my-cart`;
export const api_post_CartAdd = `${URL}/api/cart/add-to-cart`;
export const api_delete_CartDel = `${URL}/api/cart/remove`;
export const api_get_ChangeCart = `${URL}/api/cart/change-cart`;
export const api_delete_ProductCart = `${URL}/api/cart/remove`;
// hoa don
export const api_get_ListHoaDon = `${URL}/api/hoa-don/list-hoa-don`;
export const api_post_ListHdComplete = `${URL}/api/hoa-don/list-completed`;
export const api_post_InforHoaDon = `${URL}/api/hoa-don/add-info`;
export const api_post_CreateHoaDon = `${URL}/api/hoa-don/create`;
export const api_post_XacThucInfor = `${URL}/api/hoa-don/xac-thuc`;
export const api_post_XacThucHoaDon = `${URL}/api/hoa-don/xac-thuc-hoa-don`;
export const api_get_HoaDonThongKe = `${URL}/api/hoa-don/thong-ke`;
// search
export const api_get_search = `${URL}/api/product/search`;
// don hang
export const api_get_TrangThaiDonHang = `${URL}/api/hoa-don/trang-thai/`;
export const api_get_HoaDon = `${URL}/api/hoa-don/get/`;
// banks
export const api_get_Qrbank = "https://api.vietqr.io/v2/banks";
export const api_post_PayMent = "https://api.vietqr.io/v2/generate";
// chat
export const api_get_ChatAdmin = `${URL}/api/chat/admin`;
export const api_get_Message = `${URL}/api/message`;
export const api_get_ChatUser = `${URL}/api/chat/user`;
// faq admin
export const api_get_FaqTitleList = `${URL}/api/chu-de-faq/list`;
export const api_post_FaqTitleCreate = `${URL}/api/chu-de-faq/create`;
export const api_post_FaqList = `${URL}/api/faq/list-faq`;
export const api_post_FaqListCreate = `${URL}/api/faq/create`;
export const api_post_FaqListUpdate = `${URL}/api/faq/create`;
export const api_post_FaqListDelete = `${URL}/api/faq/destroy`;
// quyen
export const api_get_QuyenHanList = `${URL}/api/quyen-han/list`;
export const api_get_ChucVuList = `${URL}/api/chuc-vu/list`;
export const api_post_ChucVuUpdate = `${URL}/api/chuc-vu/update`;
export const api_post_ChucVuCreate = `${URL}/api/chuc-vu/create`;
export const api_post_ChucVuQuyenHan = `${URL}/api/chuc-vu/quyen-han`;
// luong
export const api_get_Luong = `${URL}/api/luong/select`;
export const api_get_Check = `${URL}/api/luong/check-cham-cong`;
export const api_get_ChamCong = `${URL}/api/luong/cham-cong`;
// kho
export const api_get_Kho = `${URL}/api/kho/product`;
export const api_post_WarehouseCreate = `${URL}/api/kho/create`;
export const api_get_Warehouse = `${URL}/api/kho/kho`;
// faq client
export const api_get_faq = `${URL}/api/faq/list`;
// danh gia
export const api_post_ListReview = `${URL}/api/danh-gia/list-review`;
export const api_post_WaitReview = `${URL}/api/danh-gia/wait-review`;
export const api_post_Review = `${URL}/api/danh-gia/review`;
// change password profile
export const api_post_PwProfile = `${URL}/api/user/change-password`;