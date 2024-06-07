import { View, Text, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'

import Search from '@/assets/icons/search.svg';


interface searchInfo {
    onSearch: (search: string) => void
}

export default function CustomSearchBar(props: searchInfo) {
    
    const [searchValue, setSearchValue] = useState("")
    
  return (
    <View style={{
        position: 'relative',
        marginBottom: 20
    }}>
      <TextInput
        // cursorColor="#000"
        value={searchValue}
        style={{
            backgroundColor: '#fff4',
            fontSize: 30,
            padding: 15,
            borderRadius: 15,   
            paddingRight: 42         
        }}
        onChangeText={(value) => setSearchValue(value)}
      />
        {/* <TouchableOpacity onPress={() => {}}> */}
            <TouchableOpacity  
                onPress={() => props.onSearch(searchValue)}
              
                style={{position: 'absolute', right: 10, top: 0, bottom: 0, display: 'flex', justifyContent: 'center',}}>
                <Search  width={30} height={30}/>
                
            </TouchableOpacity>
        {/* </TouchableOpacity> */}
    </View>
  )
}