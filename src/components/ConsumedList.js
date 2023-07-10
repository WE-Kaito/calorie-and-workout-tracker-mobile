import useStore from "../utils/useStore";
import styled from "styled-components/native";
import {FontAwesome5} from "@expo/vector-icons";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import unixDate from "../utils/unixDate";

function ConsumedList({theme, setIsListVisible}) {

    const history = useStore((state) => state.history);
    const deleteHistoryEntry = useStore((state) => state.deleteHistoryEntry);

    const filteredHistory = history.filter((entry) => entry.date === unixDate());
    console.log("Filtered history: ",filteredHistory);

    const renderEntry = (flatListEntry) => {
        const entry = {...flatListEntry.item};
        return (
            <View OnPress={()=>{setIsListVisible(false)}}>
                <Text>{entry.meal}</Text>
                <Text>{`${entry.calories} kcal`}</Text>
                <Text>{entry.time_stamp}</Text>
                <TouchableOpacity
                    style={{border: "none", background: "none"}}
                    onPress={() => {
                        deleteHistoryEntry(entry);
                        console.log("delete entry: ", entry);
                    }}
                >
                    <FontAwesome5
                        name={"times-circle"}
                        size={22}
                        style={{
                            color: theme.accentNegative,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <FlatList
            data={filteredHistory}
            keyExtractor={(entry) => entry.id}
            renderItem={renderEntry}
        />
    );
}

export default ConsumedList;