import React from "react";

interface SummaryProps {
  client: any;
  address: any;
  card: any;
  handleSubmit: () => void;
}

/**
 * Componente de resumo das informações do cliente, endereço e cartão.
 *
 * @param client As informações do cliente
 * @param address As informações de endereço
 * @param card As informações do cartão
 * @param handleSubmit Função para submeter os dados
 */
const Summary: React.FC<SummaryProps> = ({
  client,
  address,
  card,
  handleSubmit,
}) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Resumo</h3>
      <div className="mb-4 space-y-2">
        <p>
          <strong>Nome:</strong> {client.nome} {client.sobrenome}
        </p>
        <p>
          <strong>Email:</strong> {client.email}
        </p>
        <p>
          <strong>Data de Nascimento:</strong> {client.data_nascimento}
        </p>
        <p>
          <strong>Telefone:</strong> {client.telefone}
        </p>
        <p>
          <strong>CEP:</strong> {address.cep}
        </p>
        <p>
          <strong>Logradouro:</strong> {address.logradouro}
        </p>
        <p>
          <strong>Complemento:</strong> {address.complemento}
        </p>
        <p>
          <strong>Bairro:</strong> {address.bairro}
        </p>
        <p>
          <strong>Localidade:</strong> {address.localidade}
        </p>
        <p>
          <strong>UF:</strong> {address.uf}
        </p>
        <p>
          <strong>Número do Cartão:</strong> {card.numero}
        </p>
        <p>
          <strong>Nome no Cartão:</strong> {card.nome}
        </p>
        <p>
          <strong>Validade:</strong> {card.validade}
        </p>
        <p>
          <strong>CVV:</strong> {card.cvv}
        </p>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Finalizar
      </button>
    </div>
  );
};

export default Summary;
