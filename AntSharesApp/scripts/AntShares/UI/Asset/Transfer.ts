﻿namespace AntShares.UI.Asset
{
    export class Transfer extends TabBase
    {
        protected oncreate(): void
        {
            $("#Tab_Asset_Transfer select").change(() =>
            {
                $("#Tab_Asset_Transfer .asset_amount").text($("#Tab_Asset_Transfer select>:selected").data("amount"));
            });
            $("#Tab_Asset_Transfer .btn-primary").click(() =>
            {
                let address = $("#Tab_Asset_Transfer .pay_address").val();
                let tx: Core.ContractTransaction;
                let context: Core.SignatureContext;
                Wallets.Wallet.toScriptHash(address).then(result =>
                {
                    tx = new Core.ContractTransaction();
                    tx.outputs = [new Core.TransactionOutput()];
                    tx.outputs[0].assetId = Uint256.parse($("#Tab_Asset_Transfer select>:selected").val());
                    tx.outputs[0].scriptHash = result;
                    tx.outputs[0].value = Fixed8.parse($("#Tab_Asset_Transfer .pay_value").val());
                    if (Global.Wallet.makeTransaction(tx, Fixed8.Zero) == null)
                        throw new Error(Resources.global.insufficientFunds);
                    return Core.SignatureContext.create(tx);
                }).then(result =>
                {
                    context = result;
                    return Global.Wallet.sign(context);
                }).then(result =>
                {
                    if (!result) throw new Error(Resources.global.canNotSign);
                    if (!context.isCompleted())
                        throw new Error(Resources.global.thisVersion1);
                    tx.scripts = context.getScripts();
                    return Global.Wallet.sendTransaction(tx);
                }).then(result =>
                {
                    if (!result) throw new Error(Resources.global.txError1);
                    return Global.Node.relay(tx);
                }).then(result =>
                {
                    TabBase.showTab("#Tab_Asset_Index");
                    alert(Resources.global.contractInfo);
                }).catch(reason =>
                {
                    alert(reason);
                });
            });
        }

        protected onload(): void
        {
            if (Global.Wallet == null)
            {
                TabBase.showTab("#Tab_Wallet_Open");
                return;
            }
            let assets = linq(Global.Wallet.findUnspentCoins()).groupBy(p => p.assetId, (k, g) =>
            {
                return {
                    assetId: k,
                    amount: Transfer.sumf(g.select(p => p.value))
                };
            }).toArray();
            Promise.all(linq(assets).select(p => Core.Blockchain.Default.getTransaction(p.assetId)).toArray()).then(results =>
            {
                let select = $("#Tab_Asset_Transfer select");
                select.html("");
                for (let i = 0; i < results.length; i++)
                {
                    let asset = <Core.RegisterTransaction>results[i];
                    let option = document.createElement("option");
                    option.text = asset.getName();
                    option.value = asset.hash.toString();
                    option.dataset["amount"] = assets[i].amount.toString();
                    select.append(option);
                }
                select.change();
            });
        }

        private static sumf(values: Linq.Enumerator<Fixed8>): Fixed8
        {
            let sum = Fixed8.Zero;
            while (values.next())
                sum = sum.add(values.value());
            return sum;
        }
    }
}
