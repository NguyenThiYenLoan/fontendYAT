import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";


import PasswordRetrievalPage from "../pages/PasswordRetrievalPage/PasswordRetrievalPage";
import OtpPasswordPage from "../pages/OtpPasswordPage/OtpPasswordPage";
import ChangePassword from "../pages/ChangePassword/ChangePassword";


import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyOrder from "../pages/MyOrder/MyOrder";

import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import BillExportPage from "../pages/BillExportPage/BillExportPage";

import IntroductionPage from "../pages/IntroductionPage/IntroductionPage";
import SiteMap from "../pages/SiteMap/SiteMap";
import EntireProduct from "../pages/EntireProduct/EntireProduct";

import CheckEmailSignUpPage from "../pages/CheckEmailSignUpPage/CheckEmailSignUpPage";
import CheckOTPSignUpPage from "../pages/CheckOTPSignUpPage/CheckOTPSignUpPage";
import SearchPage from "../pages/Search/SearchPage";
import DeliveryDetails from "../pages/DeliveryDetails/DeliveryDetails";
import ChatAdmin from "../pages/Chat/ChatAdmin";
import UserPage from "../pages/User/UserPage";

// trang này để điều hướng đường link đến các trang page tương ứng
// củng như là phụ trách thêm biến isShowHeader để biết header có thể hiện ở trang nào
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/entire-product',
        page: EntireProduct,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/my-order',
        page: MyOrder,
        isShowHeader: true
    },
    {
    path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
    path: '/chat-admin',
        page: ChatAdmin,
        isShowHeader: false
    },
    {
    path: '/bill-export/:id',
        page: BillExportPage,
        isShowHeader: false
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true
    },
    {
        path: '/contact',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/introduction',
        page: IntroductionPage,
        isShowHeader: true
    },
    {
        path: '/SiteMap',
        page: SiteMap,
        isShowHeader: true
    },
    {
        path: '/User-page',
        page: UserPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/check-email-sign-up',
        page: CheckEmailSignUpPage,
        isShowHeader: false
    },
    {
        path: '/search-page',
        page: SearchPage,
        isShowHeader: true
    },
    {
        path: '/DeliveryDetails',
        page: DeliveryDetails,
        isShowHeader: true
    },
    {
        path: '/check-otp-sign-up',
        page: CheckOTPSignUpPage,
        isShowHeader: false
    },
    {
        path: '/password-retrieval',
        page: PasswordRetrievalPage,
        isShowHeader: false
    },
    {
        path: '/otp-password',
        page: OtpPasswordPage,
        isShowHeader: false
    },
    {
        path: '/change-password',
        page: ChangePassword,
        isShowHeader: false
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true
        
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]