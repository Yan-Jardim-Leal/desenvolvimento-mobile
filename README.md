# FarmIPB

Frontend do FarmIPB com mocks de dados.

## Executar

Usa Node.js 22.13.

```bash
npm install
npx expo start
```

## Estrutura

```
src/
  theme/        cores, espaçamentos e tons
  types/        modelos de domínio e de formulários
  data/         dados simulados (mocks)
  store/        reducer, ações e criadores de ações
  context/      DataContext (estado da app) e AuthContext (sessão)
  services/     consultas puras sobre o estado, autenticação, estatísticas e apresentação
  hooks/        hooks reutilizáveis (utilizador atual, permissões, formulários)
  utils/        datas, formatação e validação
  components/
    ui/         componentes genéricos (Button, Card, TextField, ...)
    domain/     componentes do domínio (TaskRow, SensorGrid, ...)
  navigation/   navegadores por perfil (auth, admin, agricultor, operador)
  screens/      ecrãs agrupados por área
```
