import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faList, faHome } from "@fortawesome/free-solid-svg-icons";

/**
 * Componente de barra lateral com links de navegação.
 */
const Sidebar: React.FC = () => {
  return (
    <aside className="w-1/5 bg-blue-500 text-white flex flex-col items-center py-4">
      <div className="flex-1 space-y-4">
        <Link href="/" legacyBehavior>
          <a className="flex items-center p-2 hover:bg-blue-700 rounded-md transition-colors">
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Início
          </a>
        </Link>
        <Link href="/cadastro-clientes" legacyBehavior>
          <a className="flex items-center p-2 hover:bg-blue-700 rounded-md transition-colors">
            <FontAwesomeIcon icon={faBox} className="mr-2" /> Cadastro de
            Clientes
          </a>
        </Link>
        <Link href="/lista-clientes" legacyBehavior>
          <a className="flex items-center p-2 hover:bg-blue-700 rounded-md transition-colors">
            <FontAwesomeIcon icon={faList} className="mr-2" /> Lista de Clientes
          </a>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
