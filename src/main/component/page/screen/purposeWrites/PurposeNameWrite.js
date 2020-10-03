<<<<<<< HEAD
import { View, Text, Dimensions } from 'react-native';
=======
import { View, Text, Modal, TouchableOpacity, Dimensions  } from 'react-native';
>>>>>>> af12d29ceb9847caa6469a2c3bb1469e79719cdb
import useStores from '../../../../mobX/helper/useStores'
import purposeStyles from './style/PurposeStyle';
import CaterPlannerTextInput from '../../../atom/input/CaterPlannerTextInput';




export default function PurposeNameWrite({index}) {

    const { purposeWriteStore } = useStores();

    const [purposeName, setPurposeName] = useState(purposeWriteStore.purpose.name);
<<<<<<< HEAD
    // const [purposeDisclosureScope, setDisclosureScope] = useState(purposeWriteStore.purpose.disclosureScope); //0 전체공개 1 비공개


=======
    const [purposeDisclosureScope, setDisclosureScope] = useState(purposeWriteStore.purpose.disclosureScope); //0 전체공개 1 비공개

    const [isScopeSelecting, setIsScopeSelecting] = useState(false);

    const scopeNames = ['전체공개', '비공개']
>>>>>>> af12d29ceb9847caa6469a2c3bb1469e79719cdb


    return (
        <View style={purposeStyles.container}>
<<<<<<< HEAD
=======
            <Modal
                transparent={true}
                visible={isScopeSelecting}
            >
                <TouchableOpacity style={{
                    backgroundColor: '#000000aa', flex: 1, justifyContent: 'flex-end'
                }}
                onPress={() => {
                    setIsScopeSelecting(false);
                }}
                >
                    <View style={{ backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15, borderTopRightRadius: 10,
                    borderTopLeftRadius: 10 }}>
                        {
                            scopeNames.map((scopeName, index) => {
                                return (
                                    <TouchableOpacity style={{ paddingVertical: 10 }}
                                        onPress={() => {
                                            setDisclosureScope(index);
                                            setIsScopeSelecting(false);
                                            purposeWriteStore.purpose.disclosureScope = index;
                                        }}
                                    >
                                        <Text>{scopeName}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
>>>>>>> af12d29ceb9847caa6469a2c3bb1469e79719cdb
            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text style={purposeStyles.title}>이루고자 하는 목적을 적어주세요</Text>
                </View>
                <View style={purposeStyles.subtitleArea}>
                    <Text style={purposeStyles.subtitle}>
                        이루고 싶은 목적의 이름을 작성해주세요. {"\n"}
                            명확한 목적으로 성공 할 수 있길 바래요.
                        </Text>
                </View>
            </View>
            <View style={[{alignSelf:'center', top : Dimensions.get('window').height / 4  ,position : 'absolute', width:'100%'}]}>
                <CaterPlannerTextInput
                    labelStyle={{color : '#25B046'}}
                    label={'목적 이름 설정하기'}
                    numberOfLines={1}
                    maxLength={32}
                    placeHolder={"이름을 입력해주세요"}
                    // onSubmitEditing={event => {
                    //     if (purposeWriteStore.isPermitNextScene)
                    //         next();
                    // }}
                    onChangeText={text => {
                        setPurposeName(text);

                        purposeWriteStore.purpose.name = text;

                        if (!(/[^\s]/g).test(text)) {
                            purposeWriteStore.changePermit(false, index);
                        } else {
                            purposeWriteStore.changePermit(true, index);
                        }
                    }}
                    value={purposeName}
                />
            </View>
<<<<<<< HEAD
=======
            <View style={{ position: 'absolute', top:  Dimensions.get('window').height  - Dimensions.get('window').height * 0.2, width: '100%', alignItmes: 'center', left: 22 }}>
                <TouchableOpacity style={{ backgroundColor: 'white', height: 26, width: 90, justifyContent: 'center', borderRadius: 8, elevation: 2 }}
                    onPress={() => {
                        setIsScopeSelecting(true);
                    }}
                >
                    <Text style={{ textAlign: 'center' }}>
                        {scopeNames[purposeDisclosureScope]}
                    </Text>
                </TouchableOpacity>
            </View>
>>>>>>> af12d29ceb9847caa6469a2c3bb1469e79719cdb
        </View>

    );
}
