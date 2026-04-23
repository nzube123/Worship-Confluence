import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../app/ui/Button";
import { Input } from "../../app/ui/Input";
import { allChoirSongs, allIndividualSongs } from "../../data/programmeSongs";
import { useMutation } from "@tanstack/react-query";
import { appendItem } from "../../app/api/googleSheet";

interface Props {
  fullName?: string;
  choirName?: string;
  phoneNumber: string;
  email: string;
  songSelected: string;
}

export default function RegistrationForm() {
  const [individualreg, setIndividualReg] = useState(true);
  const [choirreg, setChoirReg] = useState(false);

  const showIndividual = () => {
    setChoirReg(false);
    setIndividualReg(true);
  };

  const showChoir = () => {
    setChoirReg(true);
    setIndividualReg(false);
  };

  const { register, handleSubmit, watch } = useForm<Props>();

  const selectedSong = watch("songSelected")

  const mutation = useMutation({
    mutationKey: ["data"],
    mutationFn: appendItem,
  });

  const onIndividualSubmit = (data: Props) => {
    const { fullName, phoneNumber, email, songSelected } = data;
    mutation.mutate({ fullName, phoneNumber, email, songSelected });
    alert("successful")
  };

  const onChoirSubmit = (data: Props) => {
    const { choirName, phoneNumber, email, songSelected } = data;
    mutation.mutate({ choirName, phoneNumber, email, songSelected });
  };

  return (
    <div className="border rounded-2xl border-white/10 bg-black/40 p-6 backdrop-blur-md mt-7">
      <div className="gap-[100px] grid grid-cols-2">
        <Button onClick={showIndividual}>Individual</Button>
        <Button onClick={showChoir}>Choir</Button>
      </div>

      {individualreg ? (
        <form
          className="p-7 grid grid-cols-1 gap-9"
          onSubmit={handleSubmit(onIndividualSubmit)}
        >
          <Input
            type="text"
            {...register("fullName", { required: "fullName is required" })}
            placeholder="First Name"
          />
          <Input
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            placeholder="Phone number"
          />
          <Input
            type="email"
            {...register("email", { required: "Email Address Required" })}
            placeholder="Email"
          />
          <select
            className="w-full rounded-lg border border-white/20 bg-black/70 p-3 text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none"
            {...register("songSelected")}
            disabled={mutation.isPending}
          >
            <option value="" disabled hidden>
              Choose a song...
            </option>
            {allIndividualSongs.map((indiv) => (
              <option key={indiv.id} value={indiv.title}>
                {indiv.title} - {indiv.artist}
              </option>
            ))}
          </select>

          <Button type="submit">Submit</Button>
        </form>
      ) : null}

      {choirreg ? (
        <form
          className="p-7 grid grid-cols-1 gap-9"
          onSubmit={handleSubmit(onChoirSubmit)}
        >
          <Input
            type="text"
            {...register("choirName", { required: "Choir Name is required" })}
            placeholder="Choir Name"
          />
          <Input
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            placeholder="Phone number"
          />

          <Input
            type="email"
            {...register("email", { required: "Email Address Required" })}
            placeholder="Email"
          />
          <select
            className="w-full rounded-lg border border-white/20 bg-black/70 p-3 text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none"
            {...register("songSelected")}
            disabled={mutation.isPending}
          >
            <option value="" disabled hidden>
              Choose a song...
            </option>
            {allChoirSongs.map((choir) => (
              <option key={choir.id} value={choir.title}>
                {choir.title} - {choir.artist}
              </option>
            ))}
          </select>

          <Button type="submit">Submit</Button>
        </form>
      ) : null}
    </div>
  );
}
