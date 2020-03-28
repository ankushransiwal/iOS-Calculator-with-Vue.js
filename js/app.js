var calc = new Vue ({
    el : '.calculator',
    data : () => ({
        freshstart : true,
        primaryText : '0',
        secondaryText : '',
        prevOperator : '',
        currentOperator : '',
        operatorCounter : 0,
        activeSign : '',
        result : 0,
        firstNum : 0,
        secondNum : 0,
        isSecondNumSelected : false,
        isOperated : false,
    }),    
    methods : {
        buttonSelect : function (event) {
            var vmObj = this;
            buttonId = event.currentTarget.id;
            if (vmObj.freshstart) {
                vmObj.newCalc(buttonId);
            }
            else {
                vmObj.continueCalc(buttonId);
            }
        },

        newCalc : function (buttonId) {
            var vmObj = this;
            if ( buttonId == '1' || buttonId == '2' || buttonId == '3' || buttonId == '4' || buttonId == '5' ||
            buttonId == '6' || buttonId == '7' || buttonId == '8' || buttonId == '9') {
                    vmObj.freshstart = false;
                    vmObj.primaryText = buttonId;
            }
            if (buttonId == '-') {
                vmObj.activeSign = "-";
            }
            else if (buttonId == '×' || buttonId == '÷' || buttonId == '+'){
                vmObj.activeSign = '';
            }
        },

        continueCalc : function (buttonId) {
            var vmObj = this;
            if ( buttonId == '0' || buttonId == '1' || buttonId == '2' || buttonId == '3' || buttonId == '4' || buttonId == '5' ||
            buttonId == '6' || buttonId == '7' || buttonId == '8' || buttonId == '9' || buttonId == '.') {
                if (buttonId == '0' && !vmObj.isSecondNumSelected) {
                    return;
                }
                if (vmObj.operatorCounter > 0 && !vmObj.isSecondNumSelected) {
                    vmObj.primaryText = '';
                    vmObj.isSecondNumSelected = true;
                }
                if(vmObj.isOperated){
                    vmObj.primaryText = '';
                    vmObj.isOperated = false;
                }
                if ( vmObj.primaryText.length < 8) {
                    vmObj.primaryText += buttonId;
                }
                vmObj.operatorCounter = 0;
            }
            else if ( buttonId == 'cut') {
                vmObj.clearAll();
            }
            else if ( buttonId == 'equals') {
                if (!vmObj.isOperated){
                    vmObj.operate();
                }
                
                vmObj.operatorCounter = 0;
            }
            else if (buttonId == '×' || buttonId == '÷' || buttonId == '+' || buttonId == '-') {
                vmObj.operatorCounter += 1;
                // vmObj.prevOperator = buttonId;
                if (vmObj.isSecondNumSelected){
                    vmObj.operate();
                }
                else {
                    vmObj.currentOperator = buttonId;
                    vmObj.firstNum = parseFloat(vmObj.primaryText);
                    // if(vmObj.isOperated){
                    //     pa
                    // }
                    if (vmObj.activeSign == '-' && vmObj.operatorCounter == 1){
                        vmObj.secondaryText = vmObj.secondaryText.concat("-");
                        vmObj.result = 0 - vmObj.firstNum;
                        vmObj.secondaryText = vmObj.secondaryText.concat(vmObj.firstNum.toString());
                    }
                    else if (vmObj.operatorCounter == 1 && !vmObj.isOperated){
                        vmObj.result = vmObj.firstNum;
                        vmObj.secondaryText = vmObj.secondaryText.concat(vmObj.firstNum.toString());
                    }
                    else if (vmObj.operatorCounter > 1){
                        vmObj.secondaryText = vmObj.secondaryText.slice(0, -1);
                    }
                    
                    vmObj.activeSign = '';
                    
                        vmObj.primaryText = '0';
                    
                    
                }
                vmObj.currentOperator = buttonId;
                vmObj.secondaryText = vmObj.secondaryText.concat(vmObj.currentOperator);
                
            }
        },

        operate : function () {
            vmObj = this;
            vmObj.secondNum = parseFloat(vmObj.primaryText);
            switch (vmObj.currentOperator) {
                case '+' :
                    vmObj.result = vmObj.result + vmObj.secondNum;
                    break;
                case '-' :
                    vmObj.result = vmObj.result - vmObj.secondNum;
                    break;
                case '÷' :
                    vmObj.result = vmObj.result / vmObj.secondNum;
                    break;
                case '×' :
                    vmObj.result = vmObj.result * vmObj.secondNum;
                    break;
            }
            vmObj.primaryText = vmObj.result.toString();
            vmObj.firstNum = vmObj.result;
            vmObj.secondaryText = vmObj.secondaryText.concat(vmObj.secondNum.toString());
            vmObj.isSecondNumSelected = false;
            vmObj.isOperated = true;
            
            
        },

        clearAll : function () {

            // Resetting all the values to default
            Object.assign(this.$data, this.$options.data.call(this));
            // var vmObj = this;
            // vmObj.primaryText = '0';
            // vmObj.secondaryText = '';
            // vmObj.freshstart = true;
            // vmObj.result = 0;
            // vmObj.activeSign = '';
            // vmObj.isSecondNumSelected = false;
            // vmObj.isOperated = false;
            // vmObj.operatorCounter = 0;
            // vmObj.currentOperator = '';
            // vmObj.firstNum = 0;
            // vmObj.secondNum = 0;
        }    
    }
});