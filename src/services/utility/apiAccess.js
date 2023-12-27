const apiAdress = process.env.EXPO_PUBLIC_API_ADDRESS;

const APIRoutes = {
    lifeCheck:`/`,
    auth:{
        authRoute1:`/auth/doAuth`
    },
    user:{
        postRoute1:`/somepath/postthis`,
        getRoute3:`/someotherpath/getthat`,
    },
};


//This wraps the js fetch function is a timeout catcher, in which it will attempt to recconect 
//upon a timeout,
export const fetchAPIFromPost = async (route, postBody) =>
{

    // let sessionToken;
    // if (!sessionToken) 
    // {
    //     sessionToken = ""; 
    // }

    try
    {
        let controller;
        const fetchPOSTData = async (retries, timeout) =>
        {            
            controller = new AbortController();
            try
            {
                //Print time left to timeout in DEV mode.
                let i=0;
                const interval = __DEV__?setInterval((x)=>{i++; console.log("Seconds to timeout:",timeout/1000-i)},1000):undefined;

                const timer = setTimeout(() => { clearInterval(interval); controller.abort(); }, fetchTimeoutMs)
                const response = await fetch(`${AppConfig.API_ADDRESS}${route}`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'x-dev': __DEV__ ? "dev" : '',
                            'x-app-version': Constants.expoConfig?.version ?? "",
                            // 'x-auth-token': sessionToken,
                            // authorization: 'Bearer ' + authKey,
                        },
                        body: JSON.stringify(postBody),
                        signal: controller.signal
                    }
                )
                clearInterval(interval);
                clearTimeout(timer);
                // if (response.ok)
                {
                    return response;
                }
            } catch (ex)
            {
                console.log(ex)
                if (retries === 1 || retries < 1)
                {
                    console.log("Could not connect: ", `${AppConfig.API_ADDRESS}${route}`);
                    return null;
                }
                console.log("Retrying connection to", route, ":", retries - 1, "left");
                return await fetchPOSTData(retries - 1, timeout + retryDeltaMs)
            }
        }

        const response = await fetchPOSTData(fetchRetries, fetchTimeoutMs);
        if (!response)
        {
            console.error("Error while trying to connect...");
            return null;
        }
        const responseData = await response.json();

        const data = responseData; 
        // if (response.status === 403) // This can handle some error situations.
        // {
        // }
        return data;
    }

    catch (error)
    {
        console.error(error?.message);
        return null;
    }
};