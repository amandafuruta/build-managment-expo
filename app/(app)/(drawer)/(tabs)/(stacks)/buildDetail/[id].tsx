import { db } from '@/lib/firebase-config';
import styles from '@/styles/buildDetail-style';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert, TextInput } from 'react-native';

type FormData = {
  name: string;
  typology: string;
  address: string;
  start: string;
  end: string;
};
export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    typology: '',
    address: '',
    start: '',
    end: '',
  });
  const [displayEdit, setDisplayEdit] = useState(false);
  const housesCollection = collection(db, 'houses');

  useEffect(() => {
    const getHouseData = async () => {
      const querySnapshot = await getDocs(housesCollection);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (doc.id === id) {
          setFormData({
            name: data.nome,
            typology: data.tipologia,
            address: data.address,
            start: data.start,
            end: data.end,
          });
        }
      });
      setLoading(false);
    };
    getHouseData();
  }, [id]);

  const handleInputChange = useCallback((field: string, value:string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  const showAlert = (message: string, callback?: () => void) =>
    Alert.alert(
      message,
      '',
      [ {
          text: 'OK',
          onPress: callback,
        },
      ]
  );

  const deleteBuild = async () => {
    const build = doc(db, 'houses', id as string);
    await deleteDoc(build);
    showAlert('Deleted!');
  };

  const confirmDeleteAlert = () =>
    Alert.alert('Alert Message!', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: deleteBuild },
  ]);

  const editBuildDetails = async () => {
    setActivityIndicator(true);
    const build = doc(db, 'houses', id as string);

    await updateDoc(build, {
      nome: formData.name,
      tipologia: formData.typology,
      address: formData.address,
      start: formData.start,
      end: formData.end,
    });

    setActivityIndicator(false);
    showAlert('Updated!');
  };

  if (loading) {
    return (
      <>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.title}>Build Details</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <ActivityIndicator size="large" color="#417abb" />
        </View>
      </>
    );
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Build Details</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.options}>
          <Pressable style={styles.options_container} onPress={() => setDisplayEdit((prev) => !prev)}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <AntDesign name="edit" size={24} color="#710096" style={{ marginRight: 15 }} />
              <Text style={styles.option_text}>Edit</Text>
            </View>
            <AntDesign name={displayEdit ? 'arrowdown' : 'arrowright'} size={24} color="#710096" />
          </Pressable>
        </View>
        {displayEdit && (
          <View style={styles.card}>
            {['name', 'typology', 'address', 'start', 'end'].map((field) => (
              <View key={field} style={styles.details}>
                <Text style={{ fontWeight: '500', fontSize: 18, marginRight: 10 }}>
                  {`${field.charAt(0).toUpperCase() + field.slice(1)}:`}
                </Text>
                <TextInput
                  value={formData[field  as keyof FormData]}
                  placeholder={formData[field  as keyof FormData]}
                  onChangeText={(text) => handleInputChange(field, text)}
                  style={styles.input}
                />
              </View>
            ))}
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Pressable style={styles.btn} onPress={editBuildDetails}>
                {activityIndicator ? (
                  <ActivityIndicator color="#fff" style={{ paddingVertical: 3 }} />
                ) : (
                  <Text style={styles.btn_text}>Save</Text>
                )}
              </Pressable>
            </View>
          </View>
        )}
        <View style={styles.options}>
          <Link
            style={{ width: '100%' }}
            href={{
              pathname: '/(app)/(drawer)/(tabs)/(stacks)/expensesDetail/[id]',
              params: { id: id as string },
            }}>
            <View style={styles.options_container}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <AntDesign name="creditcard" size={24} color="#710096" style={{ marginRight: 15 }}  />
                <Text style={styles.option_text}>Expenses</Text>
              </View>
              <AntDesign name="arrowright" size={24} color="#710096" />
            </View>
          </Link>
        </View>
        <View style={styles.options}>
          <Link
            style={{ width: '100%' }}
            href='/(app)/(drawer)/(tabs)/(stacks)/dashboard'>
            <View style={styles.options_container}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <AntDesign name="dashboard" size={24} color="#710096" style={{ marginRight: 15 }} />
                <Text style={styles.option_text}>Dashboard</Text>
              </View>
              <AntDesign name="arrowright" size={24} color="#710096" />
            </View>
          </Link>
        </View>
        <View style={styles.options}>
          <Pressable style={styles.options_container} onPress={confirmDeleteAlert}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <AntDesign name="delete" size={24} color="#d60404" style={{ marginRight: 15 }} />
              <Text style={[styles.option_text, { color: '#d60404' }]}>Delete</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}