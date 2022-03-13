export interface BusinessItem {
    key: string;
    title: string;
    description: string;
}

export interface BusinessCategory {
    title: string;
    children: BusinessItem[];
}

export type BusinessList = BusinessCategory[]

export const businessList: BusinessList = [
    {
        title: '各种咨询',
        children: [{
            key: 'onsite-consultation',
            title: '前台咨询',
            description: '有人来前台问问题了',
        }, {
            key: 'telephone-consultation',
            title: '电话咨询',
            description: '有人打电话来问问题了',
        }],
    },
    {
        title: '网络开户 / 缴费 / 退费',
        children: [{
            key: 'department-internet-service-init',
            title: '单位新开户',
            description: '记得在 BMC 上下工单',
        }, {
            key: 'faculty-internet-service-init',
            title: '教工新开户',
            description: '',
        }, {
            key: 'network-fee-paid-with-campus-card',
            title: '用 校园卡 缴网费',
            description: '',
        }, {
            key: 'network-fee-paid-with-transfer-slip',
            title: '用 纸质转账单 缴网费',
            description: '东校没有这个东西',
        }, {
            key: 'network-fee-paid-with-payment-confirmation',
            title: '用 支付确认单 缴网费',
            description: '把确认单扫描上传到 FTP，然后交给前台老师'
        }, {
            key: 'network-fee-refund',
            title: '网费退费',
            description: '',
        }],
    },
    {
        title: '域名 / 虚拟机 / 服务器 / 信息系统 / 公务电子邮箱',
        children: [{
            key: 'domain-registration',
            title: '域名（名字服务）注册',
            description: '',
        }, {
            key: 'netid-application-activation',
            title: 'NetID 申请与激活',
            description: '',
        }, {
            key: 'virtual-machine',
            title: '虚拟机租用申请',
            description: '',
        }, {
            key: 'server',
            title: '端口开放及服务器托管申请',
            description: '',
        }, {
            key: 'cas',
            title: 'CAS 授权申请',
            description: '',
        }, {
            key: 'shared-email',
            title: '公务电子邮箱',
            description: '',
        }]
    },
    {
        title: 'USC 其他业务',
        children: [{
            key: 'usc-online-ticket',
            title: 'USC 平台流程应用技术支持',
            description: '我也不知道这是啥',
        }, {
            key: 'self-service-equipment-failure',
            title: '自助设备故障处理',
            description: '比如自助机卡纸了',
        }, {
            key: 'access-control-device-failure',
            title: '门禁故障排查处理',
            description: '就是帮忙反馈一下',
        }, {
            key: 'seal-undergraduate',
            title: '密封材料（本科生）',
            description: '请客户扫码登记一下',
        }, {
            key: 'seal-master',
            title: '密封材料（研究生）',
            description: '请客户扫码登记一下',
        }, {
            key: 'student-card',
            title: '学生证发证（补办证 + 补优惠卡）',
            description: '同学来领的时候再点我',
        }, {
            key: 'railway',
            title: '修改火车票优惠区间',
            description: '',
        }, {
            key: 'free-credit-to-print',
            title: '添加免费打印次数',
            description: '',
        }, {
            key: 'check-out-dormitory',
            title: '转交退宿通知单',
            description: '',
        }, {
            key: 'umbrella',
            title: '雨伞借用',
            description: '请客户扫码登记一下',
        }, {
            key: 'legal-person-certificate',
            title: '法人证书领取',
            description: '应该很少见',
        }]
    }
]