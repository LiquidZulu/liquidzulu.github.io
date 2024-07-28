type obj = { [key: string]: any };

export const getSubs = async (
    channel: {
        getAbout: () => Promise<
            { metadata: { subscriber_count: string } & obj } & obj
        >;
    } & obj
): Promise<string> => (await channel.getAbout()).metadata['subscriber_count'];
