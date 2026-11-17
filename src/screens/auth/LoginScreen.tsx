import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreenProps } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useForm } from '../../hooks/useForm';
import { authenticate } from '../../services/auth';
import { roleLabel } from '../../services/presentation';
import { demoCredentials } from '../../data/mocks';
import { BrandHero } from '../../components/domain';
import { Button, ErrorText, TextField } from '../../components/ui';
import { colors, fontSize, spacing } from '../../theme';

export function LoginScreen({ navigation, route }: AuthScreenProps<'Login'>) {
  const { role } = route.params;
  const { state } = useData();
  const { signIn } = useAuth();
  const { values, setField } = useForm(demoCredentials[role]);
  const [error, setError] = useState('');

  const handleLogin = () => {
    const result = authenticate(state, { ...values, role });
    if ('error' in result) return setError(result.error);
    signIn(result.user.id);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <BrandHero onBack={navigation.goBack} subtitle="Campos, parcelas e plantações da sua empresa num só lugar." />
        <View style={styles.content}>
          <Text style={styles.title}>Entrar · {roleLabel[role]}</Text>
          <TextField label="Email" value={values.email} onChangeText={setField('email')} autoCapitalize="none" keyboardType="email-address" />
          {role === 'operator' && (
            <TextField label="Código da empresa" value={values.companyCode} onChangeText={setField('companyCode')} placeholder="XXXX" autoCapitalize="none" />
          )}
          <TextField label="Palavra-passe" value={values.password} onChangeText={setField('password')} secureTextEntry />
          <Button
            label="Esqueceu-se da palavra-passe?"
            variant="link"
            style={styles.forgot}
            onPress={() => Alert.alert('Recuperar acesso', 'Contacte o gestor da sua empresa.')}
          />
          <ErrorText message={error} />
          <Button label="Entrar" onPress={handleLogin} />
          {role === 'farmer' && (
            <Button label="Ainda não tem empresa? Registar empresa" variant="link" onPress={() => navigation.navigate('RegisterUser')} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  forgot: { alignSelf: 'flex-end' },
});
