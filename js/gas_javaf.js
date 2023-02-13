function Output_to_gas()
{
	document.getElementById('startes').innerHTML = "保存中";
	let text = "";
	var data = [];

	data[0] = [];
	for(var i = 0; i <= max; i++)
	{
		data[0][i] = [];
		for(var j = 0; j <= FLAG; j++)
		{
			if(j == AUTO||j == TABLE)
			{
				data[0][i][j] = document.forms[i].elements[j].checked;
			}
			else
			{
				data[0][i][j] = document.forms[i].elements[j].value;
			}
		}
	}

	data[1]= [];
	for(var i = 0; i <= 9; i++)
	{
		data[1][i] = [];
		for(var j = 0; j <= 4; j++)
		{
			if(j == 2)
			{
				data[1][i][j] = document.forms[i + max + 1].elements[j].checked;
			}
			else
			{
				data[1][i][j] = document.forms[i + max + 1].elements[j].value;
			}
		}
        }
	
	var today = new Date();
	today.setDate(today.getDate());
	var yyyy = today.getFullYear();
	var mm = ("0"+(today.getMonth()+1)).slice(-2);
	var dd = ("0"+today.getDate()).slice(-2);
 	var date = yyyy + "年" + mm + "月" + dd + "日";

	data[2] = [];
	data[2][0] = [];
	data[2][0][0] = "　発注済・船便未確定案件　更新日" + date;
	
	let DataJSON = JSON.stringify(data); 
	google.script.run.withSuccessHandler(showStartes).write_ss(DataJSON);
}

function showStartes(returnString)
{
	document.getElementById('startes').innerHTML = returnString;
}
   
function Input_from_gas()
{
	document.getElementById('startes').innerHTML = "読込中";
	google.script.run.withSuccessHandler(output_to_html).read_ss();
}

function output_to_html(input)
{
	var data = JSON.parse(input);
	for (var i = 0 ; i <= max ; i++)
	{
		for (var j = 0 ; j <= FLAG ; j++)
        	{
			if(j == AUTO||j == TABLE)
			{
				document.forms[i].elements[j].checked = data[0][i][j];
			}
			else
			{
				document.forms[i].elements[j].value = data[0][i][j];
			}
		}
	}


	for(var i = 0; i <= 9; i++)
	{
		for(var j = 0; j <= 4; j++)
		{
			if(j == 2)
			{
				document.forms[i + max + 1].elements[j].checked = data[1][i][j];
			}
			else
			{
				document.forms[i + max + 1].elements[j].value = data[1][i][j];
			}
		}
	}

	document.getElementById('index').textContent = data[2][0][0];
	document.getElementById('startes').innerHTML = "読込完了";
	ButtonTypeChange();
	Reach_Rate();
	Set_Initial();
}
