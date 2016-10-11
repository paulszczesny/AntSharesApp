namespace AntShares.UI
{
    export class Resources
    {
        static get global()
        {
            let currentLanguage = getCookie('lang');
            if (currentLanguage == 'en')
                return global_en;
            if (currentLanguage == 'zh')
                return global_zh;
        }
    }

    class global_zh
    {
        static openWalletAlert = "打开钱包成功";
        static createWalletAlert = "创建钱包成功";
        static createAccountAlert = "创建账户成功";
        static importAccountAlert = "导入账户成功";
        static pleaseInputData = "请输入数据！";
        static WIFis = 'WIF格式的私钥为：';
        static dataFormatError = "数据格式有误！";
        static relaySuccess = "数据广播成功！";
        static relayFaild = "数据广播失败！";
        static insufficientFunds = "余额不足";
        static canNotSign = "无法签名";
        static thisVersion1 = "当前版本APP不支持多方签名或接收方签名的交易";
        static txError1 = "钱包金额已发生变化，交易无法完成";
        static electionInfo = "选举信息已经发送，等待区块确认";
        static voteInfo = "投票信息已经发送，等待区块确认";
        static issueInfo = "分发资产信息已经发送，等待区块确认";
        static registInfo = "注册资产信息已经发送，等待区块确认";
        static contractInfo = "交易信息已经发送，等待区块确认";
        static publisher = "发行者";
        static admin = "管理员";
        static amount = "总量";
        static sameWalletName = "已经存在重名的钱包文件，你可以打开钱包或者创建新的钱包。";
        static sameWalletName1 = "已经存在重名的钱包文件！";
        static selectAssetType = "请选择资产类型";
        static pleaseChoose = "请选择";
        static signFinish = "完成签名";
        static signError1 = "没有足够的私钥对数据进行签名！";
        static walletJsonError = "钱包格式有误，不正确的JSON格式！";
        static createMultiContractError = "无法添加多方签名合约，因为当前钱包中不包含签署该合约的私钥。";
        static createMultiContractSuccess = "智能合约创建成功";
        static changePwdSuccess = "修改钱包密码成功";
        static menu = "菜单";
    }

    class global_en
    {
        static openWalletAlert = "Wallet Open Complete";
        static createWalletAlert = "Wallet Creation Complete";
        static createAccountAlert = "Account Creation Complete";
        static importAccountAlert = "Account Import Complete";
        static pleaseInputData = "Please input data";
        static WIFis = 'Private Key in WIF format:';
        static dataFormatError = "Incorrect Data Format";
        static relaySuccess = "Broadcast Successful!";
        static relayFaild = "Broadcast Failed!";
        static insufficientFunds = "Insufficient Funds";
        static canNotSign = "Signing Failed";
        static thisVersion1 = "Multi-Sig and Recipient Sig transactions not supported under current App version";
        static txError1 = "Wallet Balance changed, transaction failed";
        static electionInfo = "Election Info. Transmitted, pending confirmation";
        static voteInfo = "Voting Info. Transmitted, pending confirmation";
        static issueInfo = "Asset Distribution Info. Transmitted, pending confirmation";
        static registInfo = "Asset Registration Info. Transmitted, pending confirmation";
        static contractInfo = "Transaction Info. Transmitted, pending confirmation";
        static publisher = "Issuer";
        static admin = "Administrator";
        static amount = "Total Amount";
        static sameWalletName = "Wallet File already exist, open this wallet or create one under a new name";
        static sameWalletName1 = "Wallet File already exist!";
        static selectAssetType = "Please select the type of the asset";
        static pleaseChoose = "Select";
        static signFinish = "Signautre Complete";
        static signError1 = "Insufficient Private Keys to complete this signing!";
        static walletJsonError = "Incorrect Wallet Format, JSON format error!";
        static createMultiContractError = "Multi-Sig Contract failed, private key to this contract not in the wallet";
        static createMultiContractSuccess = "Smart Contract Creation Complete";
        static changePwdSuccess = "Wallet Password Change Complete";
        static menu = "Menu";
    }
}