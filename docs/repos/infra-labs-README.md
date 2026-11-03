<!-- Proposta de README para francistone/infra-labs, no padrão do perfil. Só é aplicada lá com aprovação (PENDENCIAS.md, item 11). -->

# infra-labs

Laboratório de infraestrutura, redes e automação: guias de diagnóstico, um caso real analisado e um script de testes de rede. Tudo é genérico, sem dados de nenhuma rede real.

## Conteúdo

| Área | Guia | O que tem |
|---|---|---|
| Diagnóstico | [Checklist de diagnóstico de rede](troubleshooting/checklist-network.md) | Roteiro em 9 etapas: do físico ao desempenho, testes em horários diferentes, causas prováveis e registro do diagnóstico |
| Diagnóstico | [Diagnóstico de problemas de rede](troubleshooting/network-diagnosis.md) | Conectividade, DNS, rota, interface e desempenho, passo a passo, e as causas mais prováveis |
| Diagnóstico | [Análise de caso real](troubleshooting/real-case-analysis.md) | Upload pela metade e latência oscilando: testes, análise e conclusão |
| Monitoramento | [Testes de rede](monitoring/network-tests.md) | Métricas, testes de latência e velocidade, monitoramento contínuo |
| Monitoramento | [Script de diagnóstico](monitoring/network-diagnostic.sh) | Conectividade, DNS, rota, interfaces, tabela de rotas e porta 53, em um comando |
| Linux | [Comandos básicos para infraestrutura](linux/basic-commands.md) | Arquivos, rede, portas, processos e disco |

## Como usar o script

Requer `ping`, `traceroute`, `ip` e `nc` (netcat).

```bash
chmod +x monitoring/network-diagnostic.sh
./monitoring/network-diagnostic.sh
```

A saída mostra, em ordem: conectividade com um DNS público, resolução de nomes, a rota até a internet, as interfaces e rotas da máquina e se a porta 53 responde. **Antes de compartilhar o resultado, apague os IPs e os nomes de interface da sua rede.**

## Princípios

- Conteúdo genérico: nenhum IP, faixa de rede, provedor ou equipamento identificável.
- Cada guia parte de um sintoma real e termina numa ação concreta.

## Próximos passos

- Guias de DNS recursivo com Pi-hole e Unbound
- Exemplos de segmentação por VLAN
- Versão do script com saída resumida para colar em chamados

---

Parte do perfil de [@francistone](https://github.com/francistone).
