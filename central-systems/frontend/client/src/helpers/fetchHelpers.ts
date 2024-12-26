
export type fetchPostRequestHelperArguments = {
    formDetails:any,
    requestUrl:string,
    errorMessage:string,
    requestDescription: string,
    onSuccessHandler: ()=> any,
    onErrorHandler: ()=> any,
    onFinallyHandler: ()=> any
}

export const fetchPostRequestHelper = async (payload: fetchPostRequestHelperArguments)=>{
    const central_systems_base_api =
    process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

let requestResponse

// request details
  await fetch(
    `${central_systems_base_api}${payload.requestUrl}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload.formDetails,
      }),
    }
  )
    .then(async (response) => {
      // get the response of the upload
      requestResponse = await response.json();

      console.log(
        payload.requestDescription,
        requestResponse
      );

      if (requestResponse?.success) {
        payload.onSuccessHandler()
      } else {
        payload.onErrorHandler()
      }

      return requestResponse

    })
    .catch((requestError) => {
      console.log(
         payload.errorMessage,
        requestError
      );

      payload.onErrorHandler()

      return null
     
    }).finally(()=>{
       payload.onFinallyHandler()

      return null
    });
}


export type fetchGetRequestHelperArguments = {
  requestUrl:string,
  errorMessage:string,
  requestDescription: string,
  onSuccessHandler: ()=> any,
  onErrorHandler: ()=> any,
  onFinallyHandler: ()=> any,
  queryParams?: Record<string, string>; // Optional query parameters for GET requests
}

export const fetchGetRequestHelper = async (payload: fetchGetRequestHelperArguments)=>{
  const central_systems_base_api =
  process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

let requestResponse

let requestUrl = `${central_systems_base_api}${payload.requestUrl}`;
  if (payload.queryParams) {
    const queryString = new URLSearchParams(payload.queryParams).toString();
    requestUrl = `${requestUrl}?${queryString}`;
  }

  // await fetch results
await fetch(
  `${central_systems_base_api}${requestUrl}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
)
  .then(async (response) => {
    // get the response of the upload
    requestResponse = await response.json();

    console.log(
      payload.requestDescription,
      requestResponse
    );

    if (requestResponse?.success) {
      payload.onSuccessHandler()
    } else {
      payload.onErrorHandler()
    }

    return requestResponse

  })
  .catch((requestError) => {
    console.log(
      payload.errorMessage,
      requestError
    );

    payload.onErrorHandler()

    return null
   
  }).finally(()=>{
     payload.onFinallyHandler()

    return null
  });
}