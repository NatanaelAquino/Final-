import  { Tabs} from 'expo-router'

export default function TabsLayout(){
    return(
       <Tabs >
            <Tabs.Screen name='home' options={{headerShown:false}} />
            <Tabs.Screen name='time' options={{headerShown:false}}/>
       </Tabs>
    )
}