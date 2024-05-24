import React from "react";
import InputMask from "react-input-mask";

const AddressForm: React.FC<{
  address: any;
  setAddress: React.Dispatch<React.SetStateAction<any>>;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ address = {}, setAddress, handleAddressChange }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Informações de Endereço</h3>
      <div className="mb-4">
        <label>CEP:</label>
        <InputMask
          mask="99999-999"
          value={address.cep || ""}
          onChange={handleAddressChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label>Logradouro:</label>
          <input
            type="text"
            value={address.logradouro || ""}
            onChange={(e) =>
              setAddress({ ...address, logradouro: e.target.value })
            }
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="w-1/2">
          <label>Complemento:</label>
          <input
            type="text"
            value={address.complemento || ""}
            onChange={(e) =>
              setAddress({ ...address, complemento: e.target.value })
            }
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label>Bairro:</label>
          <input
            type="text"
            value={address.bairro || ""}
            onChange={(e) => setAddress({ ...address, bairro: e.target.value })}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="w-1/2">
          <label>Localidade:</label>
          <input
            type="text"
            value={address.localidade || ""}
            onChange={(e) =>
              setAddress({ ...address, localidade: e.target.value })
            }
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <label>UF:</label>
        <input
          type="text"
          value={address.uf || ""}
          onChange={(e) => setAddress({ ...address, uf: e.target.value })}
          className="p-2 border rounded w-1/4"
        />
      </div>
    </div>
  );
};

export default AddressForm;
