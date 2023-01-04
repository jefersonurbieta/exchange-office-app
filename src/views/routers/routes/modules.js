import modules from '@/modules'

let routes = []

for (const module in modules) {
    routes = routes.concat(modules[module].routes)
}
export default routes
