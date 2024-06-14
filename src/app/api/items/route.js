/** 
 * @author Cheng You Lee <901126jeff901126@gmail.com>
 */
export async function GET() {
    // 1. get access token  
    const token = await getToken();

    // 2. get data from TDX api
    if (token){
        const apiData = await fetchData(token);
        return Response.json({apiData});
    }else{
        return Response.json(
            {error: 'Fail to retrieve access token'},
            {status:401}
        );
    }
}
async function getToken(){
    const authUrl = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
    const params = new URLSearchParams();
    params.append('grant_type','client_credentials');
    params.append('client_id',process.env.TDX_CLIENT_ID);
    params.append('client_secret',process.env.TDX_CLIENT_SECRET);
    
    try {
        const response = await fetch(authUrl ,{
            method :'POST',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body: params,
        });
        if(response.ok){
            const data = await response.json();
            //console.log(JSON.stringify(data));
            return data.access_token;
        }else{
            console.error("Error fetch token:",response.status);
        }
    } catch(error){
        console.log("Error fetch token:",error);
    }
    return null;
}
async function fetchData(token){
    const apiUrl = 'https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/YunlinCounty';
    
    try{
        const response = await fetch(apiUrl,{
            method: 'GET',
            headers:{
                Authorizatoin:`Bearer ${token}`,
                'Content-Type':'application/json',
            },
    });
    console.log(response);
    if(response.ok){
        const data = await response.json();
        console.log(JSON.stringify(data));
        return data;
    }else{
        console.error("Error fetch data:",response.status)
    }
    } catch(error){
        console.log("Error fetch data:",error);
    }
    return null;
}