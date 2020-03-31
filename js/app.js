var calc = new Vue ({
    el : '.calculator',
    data : () => ({
        freshstart : true,
        firstTime : true,
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
        isExpo : false,
        isOverFlow : false,
        toAdd : '',
        random : 1,
    }),    
    methods : {
        changeTheme : function (event) {
            var vmObj = this;
            var root = document.documentElement;
            var rand = 1;
            do{
                rand = Math.floor((Math.random() * 7) + 1);
            }while(rand === vmObj.random);
            vmObj.random = rand;
            switch (vmObj.random) {
                case 1 :
                    root.style.setProperty('--bg-color', '#fad3b6');
                    root.style.setProperty('--body-color', '#1C1C1C');
                    root.style.setProperty('--btn-color', '#505050');
                    root.style.setProperty('--btn2-color', '#D4D4D2');
                    root.style.setProperty('--btn3-color', '#FF9500');
                    root.style.setProperty('--text-color', '#f9f9f9');
                    break;
                case 2 :
                    root.style.setProperty('--bg-color', '#c87a5e');
                    root.style.setProperty('--body-color', '#2f0b15');
                    root.style.setProperty('--btn-color', '#9a1750');
                    root.style.setProperty('--btn2-color', '#ee4c7c');
                    root.style.setProperty('--btn3-color', '#5d001e');
                    root.style.setProperty('--text-color', '#e3e2df');
                    break;
                case 3 :
                    root.style.setProperty('--bg-color', '#b2f5e7');
                    root.style.setProperty('--body-color', '#1b1b66');
                    root.style.setProperty('--btn-color', '#99738e');
                    root.style.setProperty('--btn2-color', '#def2f1');
                    root.style.setProperty('--btn3-color', '#ec0155');
                    root.style.setProperty('--text-color', '#f9f9f9');
                    break;
                case 4 :
                    root.style.setProperty('--bg-color', '#fff5d7');
                    root.style.setProperty('--body-color', '#05386b');
                    root.style.setProperty('--btn-color', '#5bbab4');
                    root.style.setProperty('--btn2-color', '#c0fcf7');
                    root.style.setProperty('--btn3-color', '#ec0155');
                    root.style.setProperty('--text-color', '#f9f9f9');
                    break;
                case 5 :
                    root.style.setProperty('--bg-color', '#def2f1');
                    root.style.setProperty('--body-color', '#016670');
                    root.style.setProperty('--btn-color', '#3aafa9');
                    root.style.setProperty('--btn2-color', '#9fedd7');
                    root.style.setProperty('--btn3-color', '#fbe180');
                    root.style.setProperty('--text-color', '#303030');
                    break;
                case 6 :
                    root.style.setProperty('--bg-color', '#89bdbb');
                    root.style.setProperty('--body-color', '#8e8d89');
                    root.style.setProperty('--btn-color', '#d8c3a4');
                    root.style.setProperty('--btn2-color', '#eae8dc');
                    root.style.setProperty('--btn3-color', '#e88073');
                    root.style.setProperty('--text-color', '#f9f9f9');
                    break;
                case 7 :
                    root.style.setProperty('--bg-color', '#3aafa9');
                    root.style.setProperty('--body-color', '#4e4a41');
                    root.style.setProperty('--btn-color', '#6e6659');
                    root.style.setProperty('--btn2-color', '#edeae5');
                    root.style.setProperty('--btn3-color', '#e85a50');
                    root.style.setProperty('--text-color', '#f9f9f9');
                    break;
            } 
            

        },
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
            buttonId == '6' || buttonId == '7' || buttonId == '8' || buttonId == '9' || buttonId == '.') {
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
            if ( buttonId == 'cut') {
                vmObj.clearAll();
            }
            if (vmObj.isOverFlow){
                return;
            }
            if ( buttonId == '0' || buttonId == '1' || buttonId == '2' || buttonId == '3' || buttonId == '4' || buttonId == '5' ||
            buttonId == '6' || buttonId == '7' || buttonId == '8' || buttonId == '9' || buttonId == '.') {
                if (vmObj.firstTime) {
                    vmObj.isSecondNumSelected = true;
                }
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
            else if ( buttonId == 'equals') {
                if (!vmObj.isOperated){
                    vmObj.operate();
                }
                
                vmObj.operatorCounter = 0;
            }
            else if (buttonId == '×' || buttonId == '÷' || buttonId == '+' || buttonId == '-') {
                
                if(vmObj.firstTime) {
                    vmObj.firstTime = false;
                    vmObj.isSecondNumSelected = false;
                }
                vmObj.operatorCounter += 1;
                if (vmObj.isSecondNumSelected){
                    vmObj.operate();
                    if(vmObj.isOverFlow){
                        return;
                    }
                }
                else {
                    vmObj.currentOperator = buttonId;
                    vmObj.firstNum = parseFloat(vmObj.primaryText);
                    
                    if (vmObj.activeSign == '-' && vmObj.operatorCounter == 1){
                        vmObj.secondaryText = vmObj.secondaryText.concat("-");
                        vmObj.result = 0 - vmObj.firstNum;
                        vmObj.toAdd = vmObj.secondaryText.concat(vmObj.firstNum.toString());
                        if (vmObj.toAdd.length < 18){
                            vmObj.secondaryText = vmObj.toAdd;
                            console.log(vmObj.toAdd.length);
                        }   
                    }
                    else if (vmObj.operatorCounter == 1 && !vmObj.isOperated){
                        vmObj.result = vmObj.firstNum;
                        vmObj.toAdd = vmObj.secondaryText.concat(vmObj.firstNum.toString());
                        console.log(vmObj.toAdd);
                        if (vmObj.toAdd.length < 18){
                            vmObj.secondaryText = vmObj.toAdd;
                            console.log(vmObj.toAdd.length);
                        }  
                    }
                    else if (vmObj.operatorCounter > 1){
                        vmObj.secondaryText = vmObj.secondaryText.slice(0, -1);
                    }
                    
                    vmObj.activeSign = '';
                    
                        vmObj.primaryText = '0';
                    
                    
                }
                vmObj.currentOperator = buttonId;
                vmObj.secondaryText = vmObj.secondaryText.concat(vmObj.currentOperator);
                if (vmObj.secondaryText.toString().length > 16){
                    document.getElementById("display-text-secondary").style.fontSize = "2.5vh";
                    vmObj.isOverFlow = true;
                }
                
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
            if (vmObj.result.toString().length > 8 && !vmObj.isExpo) {
                vmObj.result = vmObj.result.toExponential(4);
                vmObj.isExpo = true;
            }
            
            vmObj.firstNum = vmObj.result;
            vmObj.toAdd = vmObj.secondaryText.concat(vmObj.secondNum.toString());
            console.log(vmObj.toAdd);
            if (vmObj.toAdd.length < 18){
                vmObj.secondaryText = vmObj.toAdd;
                console.log(vmObj.toAdd.length);
            }
            else {
                vmObj.isOverFlow = true;
                return;
            }  
            vmObj.primaryText = vmObj.result.toString();
            vmObj.isSecondNumSelected = false;
            vmObj.isOperated = true;
            
            
        },

        clearAll : function () {
            document.getElementById("display-text-secondary").style.fontSize = "3vh";
            // Resetting all the values to default
            Object.assign(this.$data, this.$options.data.call(this));
        }    
    }
});