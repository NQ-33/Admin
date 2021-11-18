import {
    Form,
    FormItem,
    Input,
    Button,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,

    Message,
} from 'element-ui'
const element = {
    install: function(Vue) {
        Vue.use(Form);
        Vue.use(FormItem);
        Vue.use(Input);
        Vue.use(Button);
        Vue.use(Container);
        Vue.use(Header);
        Vue.use(Aside);
        Vue.use(Main);
        Vue.use(Menu);
        Vue.use(Submenu);
        Vue.use(MenuItemGroup);
        Vue.use(MenuItem);
        Vue.use(Breadcrumb);
        Vue.use(BreadcrumbItem);
        Vue.use(Card);
        Vue.use(Row);
        Vue.use(Col);
        Vue.use(Table);
        Vue.use(TableColumn);
        Vue.use(Switch);
        Vue.use(Tooltip);
        Vue.use(Pagination);
        Vue.use(Dialog);

        Vue.prototype.$message = Message;
    }
}
export default element