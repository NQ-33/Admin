import {
    Form,
    FormItem,
    Input,
    Button,
    Message
} from 'element-ui'
const element = {
    install: function(Vue) {
        Vue.use(Form);
        Vue.use(FormItem);
        Vue.use(Input);
        Vue.use(Button);
        Vue.prototype.$message = Message;
    }
}
export default element