﻿namespace AntShares.UI.Advanced
{
    export class Sign extends TabBase
    {
        protected oncreate(): void
        {
            $(this.target).find("#sign").click(this.onSignButtonClick);
            $(this.target).find("#sign_relay").click(this.onSignRelayButtonClick);
        }

        protected onload(args: any[]): void
        {
            $("#Tab_Advanced_Sign #input_data").val("");
            $("#Tab_Advanced_Sign #input_data").focus();

        }

        private onSignButtonClick = () =>
        {
            let inputData: string = $("#Tab_Advanced_Sign #input_data").val();
            try {
                if (inputData == ""){
                    alert(Resources.global.pleaseInputData);
                } else {
                    let context: Core.SignatureContext;
                    Core.SignatureContext.Parse(JSON.parse(inputData)).then(result => {
                        context = result;
                        console.log(context);
                        return Global.Wallet.sign(result);
                    }).then(success => {
                        if (success) {
                            console.log(context);
                            $("#Tab_Advanced_Sign #output_section").removeAttr("style");
                            $("#Tab_Advanced_Sign #output_data").text(context.toString());
                            alert(Resources.global.signFinish);
                        }
                        else {
                            alert(Resources.global.signError1);
                        }
                    }).catch(reason => {
                        alert(reason);
                    });
                }
            } catch (e) {
                if (e instanceof SyntaxError) {
                    alert(Resources.global.dataFormatError);
                }
                else {
                    alert(e);
                }
            }
            
        }

        private onSignRelayButtonClick = () =>
        {
            let inputData: string = $("#Tab_Advanced_Sign #input_data").val();
            try {
                if (inputData == "")
                {
                    alert(Resources.global.pleaseInputData);
                } else {
                    let inventory: Network.Inventory;
                    let context: Core.SignatureContext;
                    Core.SignatureContext.Parse(JSON.parse(inputData)).then(result => {
                        context = result;
                        return Global.Wallet.sign(result);
                    }).then(success => {
                        if (success) {
                            $("#Tab_Advanced_Sign #output_section").removeAttr("style");
                            $("#Tab_Advanced_Sign #output_data").text(context.toString());
                            context.signable.scripts = context.getScripts();
                            inventory = <Network.Inventory>context.signable;
                            return Global.Node.relay(inventory);
                        }
                        else {
                            alert(Resources.global.signError1);
                        }
                        }).then(result =>
                        {
                            alert(Resources.global.relaySuccess);
                    }).catch(reason => {
                        alert(reason);
                    });
                }
            } catch (e) {
                if (e instanceof SyntaxError) {
                    alert(Resources.global.dataFormatError);
                }
                else {
                    alert(e);
                }
            }

        }

    }
}