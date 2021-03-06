import "src/ClientPortal.less";
export interface ClientPortalStateInfo {
    auth: boolean;
    name: string;
    params: Object;
}
export interface ClientPortalChangeStateInfo {
    fromState: ClientPortalStateInfo;
    toState: ClientPortalStateInfo;
    isVirtual: boolean;
}
export interface ClientPortalUserInfo {
    FirstName: string;
    LastName: string;
    Email: string;
    HomeClubId: number;
    PhotoUrl: string;
    Type: string;
}
export interface ClientPortalAuthInfo {
    isAuthenticated: boolean;
    user: ClientPortalUserInfo;
}
export interface LoginViewOptions {
    navbar?: boolean;
    logo?: boolean;
}
export interface AfterLoginOptions {
    navbar?: boolean;
    logo?: boolean;
}
export interface RegistrationOptions {
    logo?: boolean;
}
export interface ClientPortalOptions {
    /**
     * Client Portal application url.
     */
    url: string;
    /**
     * First state showed to user after load. Unauthenticated users are redirected to ClientPortal.State.Login.
     */
    defaultState?: string;
    /**
     * State params from which client portal will be loaded.
     */
    defaultStateParams?: any;
    /**
     * [DEPRECATED]
     * Navbar height in pixels.
     */
    /**
     * Laguage code standarized by ISO 639-1
     */
    language?: string;
    /**
     * Callback fired when iframe connects to Client Portal.
     */
    onConnect?(): void;
    /**
     * Decides whether to show default Client Portal load mask.
     */
    hideLoadMask?: boolean;
    /**
     * Decides whether to hide load mask on initializing iframe.
     */
    hideInitLoadMask?: boolean;
    /**
     * Callback fired when Client Portal normally shows load mask.
     */
    onShowLoadMask?(): void;
    /**
     * Callback fired when Client Portal normally hides load mask.
     */
    onHideLoadMask?(): void;
    /**
     * Decides whether to show modal overlay layer on top and bottom of the iframe.
     * Overlay covers elements outside of iframe on parent element to focus user attention
     * on popups and other elements opened in Client Portal.
     */
    hideModalOverlay?: boolean;
    /**
     * Callback fired when Client Portal shows modal.
     */
    onShowModal?(): void;
    /**
     * Callback fired when Client Portal hides modal.
     */
    onHideModal?(): void;
    /**
     * Callback fired when user logs in to Client Portal.
     */
    onUserLoggedIn?(data: ClientPortalAuthInfo): void;
    /**
     * Callback fired when user logs out from Client Portal.
     */
    onUserLoggedOut?(data: ClientPortalAuthInfo): void;
    /**
     * Callback fired when Client Portal finished transition to other state.
     */
    onStateChangeSuccess?(data: ClientPortalChangeStateInfo): void;
    /**
     * Some of Client Portal states are virtual - they shouldn't be added to browser history.
     * Setting this flag to true means that in onStateChangeSuccess() callback function
     * you will get object with property isVirtual which means that state is virtual.
     *
     * @default false
     */
    enableVirtualStates?: boolean;
    /**
     * Callback fired when dropdown opens on mobile mode.
     */
    onMobileDropdownOpen?(): void;
    /**
     * Callback fired when dropdown closes on mobile mode.
     */
    onMobileDropdownClose?(): void;
    /**
     * Callback on content scroll.
     *
     * @returns ScrollTop value which normally would be used to scroll window object.
     */
    onContentScroll?(scrollTop: number): void;
    /**
     * login/register view.
     */
    loginViews?: LoginViewOptions;
    /**
     * Views visible after user login options.
     */
    afterLoginViews?: AfterLoginOptions;
    /**
     * Registration options.
     */
    registrationViews?: RegistrationOptions;
}
export declare class ClientPortal {
    private _element;
    private _elementWrapper;
    private _elementWrapperSelector;
    private _modalOverlaySelector;
    private _promiseResolveMap;
    private _wasConnectedBefore;
    private _companyUrl;
    static readonly State: {
        Login: string;
        Registration: string;
        Classes: string;
        ClassesList: string;
        PersonalTraining: string;
        ReservedClasses: string;
        Products: string;
        BuyProducts: string;
        Profile: string;
        ProfileEdit: string;
        ProfilePayment: string;
        ProfileContract: string;
        ProfileFreeze: string;
        ProfilePrepaid: string;
        ProfileChangePassword: string;
        ProfilePayments: string;
        ProfileFamily: string;
    };
    constructor(wrapper: HTMLElement, options: ClientPortalOptions);
    private _onMessage(msg, options, event);
    private _onResponse(msg);
    private _getIframeTopOffset();
    private _getViewport(options);
    private recieveMsg(msg, options);
    private _createModalOverlay();
    private _showModalOverlay();
    private _hideModalOverlay();
    private _createIframe(elementWrapper, options);
    private _serializeParams(paramsObject);
    private _sendData(action, data?);
    private _setCookieOnParent();
    goTo(state: string, params?: Object): Promise<{}>;
    logout(): Promise<{}>;
    changeLanguage(languageCode: string): Promise<{}>;
    isUserLoggedIn(): Promise<{}>;
    getElement(): HTMLIFrameElement;
}
