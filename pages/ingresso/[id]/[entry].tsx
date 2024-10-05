// This is a skeleton starter React page generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from "react";
import { PageParamsProvider as PageParamsProvider__ } from "@plasmicapp/react-web/lib/host";

import { PlasmicIngresso } from "../../../components/plasmic/a_d/PlasmicIngresso";
import { useRouter } from "next/router";
import {
  useMutablePlasmicQueryData,
  usePlasmicQueryData,
} from "@plasmicapp/react-web/lib/query";
import { supabase } from "@/components/supabase/supabase";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Ingresso() {
  const router = useRouter();
  const { id, entry } = router.query;

  const [isLoading2, setIsLoading2] = React.useState(true);
  const [notPaid, setNotPaid] = React.useState(true);
  const [info, setInfo] = React.useState<any>();
  const [isNew, setIsNew] = React.useState(0);
  const [notAuthorized, setNotAuthorized] = React.useState(false);

  const { data, isLoading, error, mutate } = useMutablePlasmicQueryData(
    `ingresso/${id}/${entry}`,
    async () => {
      let query = supabase.from("checkin").select();
      query = query.filter("inscricao_id", "eq", id);
      query = query.filter("inscricao_number", "eq", entry);
      const { data, error } = await query;
      if (error !== null) {
        throw new Error(error.message);
      }
      return data;
    }
  );
  const {
    data: inscricao,
    isLoading: isLoadingInscricao,
    error: error2,
  } = usePlasmicQueryData(`inscricao/${id}/${entry}`, async () => {
    let query = supabase.from("inscritos_fernandinho").select();
    query.filter("id", "eq", id);
    const { data, error } = await query;
    if (error !== null) {
      throw new Error(error.message);
    }
    return data;
  });
  const {
    data: payment,
    isLoading: isLoadingPayment,
    error: error3,
  } = usePlasmicQueryData(`inscricao/${id}/${entry}`, async () => {
    let query = supabase.from("payments").select();
    query.filter("user_id", "eq", id);
    const { data, error } = await query;
    if (error !== null) {
      throw new Error(error.message);
    }
    return data;
  });
  React.useEffect(() => {
    const fn = async () => {
      if (!data || !inscricao || !payment) {
        return;
      }
      const name = localStorage.getItem("isv-admin");
      if (!name) {
        setNotAuthorized(true);
        return;
      }
      if (inscricao.length === 0) {
        throw new Error(`Inscricao nao encontrada: ${id}`);
      }
      if (payment.length === 0) {
        setNotPaid(false);
        return;
      }
      if (data.length === 0) {
        await supabase.from("checkin").insert({
          inscricao_id: id,
          inscricao_number: entry,
          responsavel: name,
        });
        mutate();
        setIsNew(1);
      } else if (data.length === 1) {
        setIsNew((prev) => !prev ? 2 : prev);
        setIsLoading2(false);
        const date = new Date(data[0].created_at);
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with zero
        const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad with zero if needed
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with zero

        setInfo({
          nome: `${inscricao[0].name} (${+(entry?? 0)+1} de ${inscricao[0].ticketInfo.vip + inscricao[0].ticketInfo.geral})`,
          data: `${day}/${month}`,
          horario: `${hours}:${minutes}`,
          pessoa: data[0].responsavel,
          tipo: (+(entry ?? 0)) >= inscricao[0].ticketInfo.vip ? "Ingresso Pista Geral" : "Ingresso Pista VIP",
        })
      }
    };
    fn();
  }, [data, inscricao, payment]);

  React.useEffect(() => {
    if (isNew === 1) {
      toast.success("CHECK-IN REALIZADO")
    } else if (isNew === 2) {
      toast.error("CHECK-IN JÁ REALIZADO");
    }
  }, [isNew]);
  return error || error2 || error3 || notAuthorized ? (
    <h1>Not Authorized</h1>
  ) : (
    <PageParamsProvider__
      route={useRouter()?.pathname}
      params={useRouter()?.query}
      query={useRouter()?.query}
    >
      <PlasmicIngresso
        loading={isLoading || isLoading2 || isLoadingInscricao || isLoadingPayment}
        loadingSlot={
          <ColorRing
            visible={true}
            height="250"
            width="250"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['blue', 'blue', 'blue', 'blue', 'blue']}
          />
        }
        {...info}
      />
      <ToastContainer />
    </PageParamsProvider__>
  );
}

export default Ingresso;
