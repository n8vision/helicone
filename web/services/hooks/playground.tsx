import useRequestsPageV2 from "../../components/templates/requestsV2/useRequestsPageV2";

export const usePlaygroundPage = (requestId: string) => {
  const requests = useRequestsPageV2(
    1,
    1,
    [],
    {
      request: {
        id: {
          equals: requestId,
        },
      },
    },
    {},
    false,
    false
  );

  let isChat = false;

  const getChat = () => {
    if (!requests.requests || requests.requests.length < 1) {
      return [];
    }

    const sourceChat = JSON.parse(
      JSON.stringify(requests.requests[0].requestBody)
    );

    const sourceResponse = JSON.parse(
      JSON.stringify(requests.requests[0].responseBody)
    );

    const sourcePrompt = [
      ...sourceChat.messages,
      sourceResponse.choices[0].message,
    ];

    if (sourcePrompt.length > 1) {
      isChat = true;
    }

    return sourcePrompt;
  };

  const chat = getChat();

  return {
    isLoading: requests.isDataLoading,
    data: requests.requests,
    chat,
    hasData: requests.requests && requests.requests.length > 0,
    isChat,
  };
};
