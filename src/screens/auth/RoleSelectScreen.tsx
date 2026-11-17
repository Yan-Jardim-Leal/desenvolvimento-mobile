import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreenProps } from '../../navigation/types';
import { BrandHero, RoleCard } from '../../components/domain';
import { Button, Notice } from '../../components/ui';
import { colors, fontSize, spacing } from '../../theme';

export function RoleSelectScreen({ navigation }: AuthScreenProps<'RoleSelect'>) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <BrandHero badge="ECOSSISTEMA IPB" subtitle="Gestão de campos, parcelas e equipa" />
        <View style={styles.content}>
          <Text style={styles.title}>Entrar como</Text>
          <Text style={styles.subtitle}>Selecione o seu perfil de acesso para continuar</Text>
          <RoleCard
            highlighted
            icon="account-tie-outline"
            tag="GESTÃO COMPLETA"
            title="Agricultor"
            description="Administre campos, parcelas, culturas e toda a sua equipa."
            onPress={() => navigation.navigate('Login', { role: 'farmer' })}
          />
          <RoleCard
            icon="account-hard-hat-outline"
            tag="CAMPO & TAREFAS"
            title="Operador"
            description="Consulte tarefas atribuídas, registe atividades e alertas."
            onPress={() => navigation.navigate('Login', { role: 'operator' })}
          />
          <Notice title="Primeiro acesso ao sistema?" message="Os operadores recebem o código pelo gestor." tone="earth" />
          <Button label="Registar empresa" variant="link" onPress={() => navigation.navigate('RegisterUser')} />
          <Button label="Acesso administrativo" variant="link" onPress={() => navigation.navigate('Login', { role: 'admin' })} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: fontSize.sm, color: colors.muted, marginTop: -spacing.sm },
});
