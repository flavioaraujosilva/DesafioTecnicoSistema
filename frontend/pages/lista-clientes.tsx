import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MaterialTable from "@material-table/core";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/CreditCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardList from "../components/CreditCardList";
import EditAddressForm from "../components/EditAddressForm";
import ClientInfoForm from "../components/ClientInfoForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListaClientes: React.FC = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [openCardModal, setOpenCardModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const router = useRouter();

  const fetchData = async (page: number, pageSize: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/clientes?page=${
          page + 1
        }&per_page=${pageSize}`
      );
      setData(response.data.data);
      setTotalCount(response.data.total);
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
    }
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  const handleEdit = (cliente: any) => {
    if (!cliente.telefones || cliente.telefones.length === 0) {
      cliente.telefones = [{ numero: "" }];
    }
    setSelectedCliente(cliente);
    setOpenEditClientModal(true);
  };

  const handleDelete = async (cliente: any) => {
    try {
      await axios.delete(`http://localhost:8000/api/clientes/${cliente.id}`);
      toast.success("Cliente excluído com sucesso!");
      fetchData(page, pageSize);
    } catch (error) {
      console.error("Erro ao excluir cliente", error);
      toast.error("Erro ao excluir cliente");
    }
  };

  const handleOpenCardModal = (cliente: any) => {
    setSelectedCliente(cliente);
    setOpenCardModal(true);
  };

  const handleCloseCardModal = () => {
    setOpenCardModal(false);
    setSelectedCliente(null);
  };

  const handleOpenAddressModal = (cliente: any) => {
    setSelectedCliente(cliente);
    setOpenAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setOpenAddressModal(false);
    setSelectedCliente(null);
  };

  const handleCloseEditClientModal = () => {
    setOpenEditClientModal(false);
    setSelectedCliente(null);
  };

  const handleSaveClient = async (clientData: any) => {
    try {
      await axios.put(
        `http://localhost:8000/api/clientes/${clientData.id}`,
        clientData
      );
      toast.success("Cliente atualizado com sucesso!");
      handleCloseEditClientModal();
      fetchData(page, pageSize);
    } catch (error) {
      console.error("Erro ao atualizar o cliente", error);
      toast.error("Erro ao atualizar o cliente");
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
          <ToastContainer />
          <h2 className="text-2xl font-bold text-center mb-6">
            Lista de Clientes
          </h2>
          <MaterialTable
            columns={[
              { title: <strong>Nome</strong>, field: "nome" },
              { title: <strong>Email</strong>, field: "email" },
              {
                title: <strong>Telefone</strong>,
                field: "telefones",
                render: (rowData) =>
                  rowData.telefones.map((tel: any) => tel.numero).join(", "),
              },
              {
                title: <strong>Rua</strong>,
                field: "enderecos",
                render: (rowData) =>
                  rowData.enderecos
                    .map((end: any) => end.logradouro)
                    .join(", "),
              },
              {
                title: <strong>Cidade</strong>,
                field: "enderecos",
                render: (rowData) =>
                  rowData.enderecos
                    .map((end: any) => end.localidade)
                    .join(", "),
              },
              {
                title: <strong>Estado</strong>,
                field: "enderecos",
                render: (rowData) =>
                  rowData.enderecos.map((end: any) => end.uf).join(", "),
              },
              {
                title: (
                  <div style={{ textAlign: "center" }}>
                    <strong>Ações</strong>
                  </div>
                ),
                field: "acoes",
                render: (rowData) => (
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Tooltip title="Editar Cliente">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(rowData)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir Cliente">
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => handleDelete(rowData)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Gerenciar Cartões">
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => handleOpenCardModal(rowData)}
                      >
                        <AddCardIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar Endereço">
                      <IconButton
                        style={{ color: "blue" }}
                        onClick={() => handleOpenAddressModal(rowData)}
                      >
                        <LocationOnIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ),
              },
            ]}
            data={(query) =>
              new Promise((resolve, reject) => {
                let url = `http://localhost:8000/api/clientes?`;
                url += `page=${query.page + 1}`;
                url += `&per_page=${query.pageSize}`;
                axios.get(url).then((result) => {
                  resolve({
                    data: result.data.data,
                    page: result.data.current_page - 1,
                    totalCount: result.data.total,
                  });
                });
              })
            }
            options={{
              search: true,
              sorting: true,
              paging: true,
              pageSize: pageSize,
              pageSizeOptions: [10, 20, 50],
              actionsColumnIndex: -1,
              width: "100%",
              toolbar: false,
              serverSide: true,
            }}
            localization={{
              header: {
                actions: "Ações",
              },
              body: {
                emptyDataSourceMessage: "Nenhum registro para exibir",
              },
              toolbar: {
                searchTooltip: "Pesquisar",
                searchPlaceholder: "Pesquisar",
              },
              pagination: {
                labelRowsSelect: "linhas",
                labelDisplayedRows: "{from}-{to} de {count}",
                firstTooltip: "Primeira página",
                previousTooltip: "Página anterior",
                nextTooltip: "Próxima página",
                lastTooltip: "Última página",
              },
            }}
            onPageChange={(newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              const value = event.target.value;
              if (value) {
                setPageSize(parseInt(value, 10));
                setPage(0); // Reseta para a primeira página ao mudar o tamanho da página
              }
            }}
          />
        </div>

        {/* Modal para exibir cartões */}
        {selectedCliente && (
          <CreditCardList
            clienteId={selectedCliente.id}
            open={openCardModal}
            onClose={handleCloseCardModal}
          />
        )}

        {/* Modal para editar endereço */}
        {selectedCliente && (
          <Dialog
            open={openAddressModal}
            onClose={handleCloseAddressModal}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Editar Endereço</DialogTitle>
            <DialogContent>
              <EditAddressForm
                clienteId={selectedCliente.id}
                onSave={handleCloseAddressModal}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddressModal} color="primary">
                Fechar
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Modal para editar cliente */}
        {selectedCliente && (
          <Dialog
            open={openEditClientModal}
            onClose={handleCloseEditClientModal}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogContent>
              <ClientInfoForm
                client={selectedCliente}
                setClient={setSelectedCliente}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditClientModal} color="primary">
                Fechar
              </Button>
              <Button
                onClick={() => handleSaveClient(selectedCliente)}
                color="primary"
                variant="contained"
              >
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </main>
    </div>
  );
};

export default ListaClientes;
