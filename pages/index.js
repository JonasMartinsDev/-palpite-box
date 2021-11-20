import React from "react";
import Link from "next/link";
import useSWR from "swr";
import PageTitle from "../components/PageTitle";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Index = () => {
  const { data, error } = useSWR("/api/get-promo", fetcher);
  return (
    <>
      <PageTitle title="Seja Bem-Vindo" />

      <p className={"mt-12 text-center"}>
        A engedata sempre busca por atender melhor seus funcionários. <br />
        Por isso, estamos sempre abertos a ouvir a sua opinião.
      </p>
      <div className={"text-center my-12"}>
        <Link href={"/pesquisa"}>
          <a
            className={
              "bg-blue-400 px-6 py-4 font-bold rounded-lg shadow-lg hover:shadow"
            }
          >
            Dar opinião e sugestão
          </a>
        </Link>
      </div>

      {!data && <p className={"m-12 text-center"}>Carregando...</p>}
      {!error && data && data.showCupon && (
        <p className={"m-12 text-center"}>{data.message}</p>
      )}
    </>
  );
};

export default Index;
