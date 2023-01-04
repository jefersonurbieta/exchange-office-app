export default class PageUtils {
    constructor(router) {
        this.router = router
    }

    goToHome() {
        this.router.push({ path: '/' })
    }

    static reload() {
        window.location.reload()
    }

}
