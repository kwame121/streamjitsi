
function formDataException(message,exceptionName)
{
    this.message = message;
    this.exceptionName = exceptionName;
}



class Utils 
{
    
    static extract_user_details(object,type,access_token='')
    {
        switch(type)
        {
            case 'Youtube':
                
                let {id,picture} = object;
                let name_yt = object.name;
                return {
                    name:name_yt,
                    id:id,
                    picture:picture,
                    destination:'youtube',
                    access_token:access_token,
                }
                break;
            case 'Twitch':
                let {_id,logo} = object;
                let name_tw = object.name;
                return{
                    name:name_tw,
                    id:_id,
                    picture:logo,
                    destination:'twitch',
                    access_token:access_token,
                }
                break;
        }
    }


    //d-hacks..... write a function to get all the broadcasts as an array from local storage and return them...
    //use the get_destinations as a reference i guess, although its slightly different... work with David to do that, since david will 
    //be writing the code to insert the broadcasts into local storage...
    //

    static get_destinations()
    {
        try
        {
            let destinationArray = [];
            if (localStorage.getItem('youtube_userData')!==null)
            {
                let accessToken = JSON.parse(localStorage.getItem('youtube_oauth'))===null?'':JSON.parse(localStorage.getItem('youtube_oauth'));
                const youtubeObject = this.extract_user_details(JSON.parse(localStorage.getItem('youtube_userData')),'Youtube',accessToken);
                destinationArray.push(youtubeObject);
            }
            if (localStorage.getItem('twitch_userData')!==null){
                let twitchObject = this.extract_user_details(JSON.parse(localStorage.getItem('twitch_userData')),'Twitch');
                destinationArray.push(twitchObject);
            }
            return destinationArray;
            //create generic array...
        }
        catch(e)
        {
            console.error('Error has occured',e);
            return [];
        }
    }


    static get_broadcasts() // this will be replaced with some db query in the future...
    {
        let broadcastArray = [];
        try
        {
            if (localStorage.getItem("broadcasts")!==null)
            {
                broadcastArray = JSON.parse(localStorage.getItem("broadcasts"));
            }
            return broadcastArray;
        }
        catch(e)
        {
            console.error('Error has occured',e);
            return [];
        }

    }

    static validate_email(email)
    {
        let reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let is_valid = reg_ex.test(email);
        return  ({is_valid:is_valid, error:'Please format email properly'});
    }


    static validate_number(number)
    {
        let is_valid = !isNaN(number);
        return ({is_valid:is_valid,error:'Invalid input, please use numbers only'});
    }

    static validate_text(text)
    {
        let is_valid = typeof(text)==="string"&&text!=='';
        console.log(is_valid);
        return ({is_valid, error:'Invalid input, please use strings only,field should not be empty'});
    }

    static validate_url(string)
    {
        let is_valid = true;
        try
        {
            let url = new URL(string);

        }
        catch
        {
            is_valid = false;
        }
        return ({is_valid,error:'Invalid url, please use a valid url'});
    }



    static get_type_callback(target)
    {
      let type = target.split('_')[1];
      let callback = null;
      if (type==='number')
      {
          callback = this.validate_number;
      }
      else if (type==='email')
      {
          callback = this.validate_email;
      }
      else if (type==='url')
      {
          callback = this.validate_url;
      }
      else if (type==='text')
      {
          callback= this.validate_text;
      }
      return callback;
    }

    static validate_form(form_object)
    {
        let error_array = [];
        let valid = true;
        for (const[key,value] of Object.entries(form_object))
        {
            let val_function = this.get_type_callback(key);
            let {is_valid,error} = val_function(value);
            if (!is_valid)
            {
                error_array.push(error);
                valid=false;
                return{valid,error_array};
            }

        }

        return {valid,error_array};
        // this is where things get complicated...
        // get the type and validate in its own special way...
    }

    static edit_form(e,target,form_object,callback)
    {
        let value = e.target.value;
        let form_object_copy = form_object;
        form_object_copy[target] = value;
        callback(form_object_copy);
    }
}

module.exports = {Utils};



