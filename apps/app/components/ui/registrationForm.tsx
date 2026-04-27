import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../app/ui/Button";
import { Input } from "../../app/ui/Input";
import { allChoirSongs, allIndividualSongs, programmeDays } from "../../data/programmeSongs";
import { appendItem } from "../../app/api/googleSheet";
import { useCustomMutation } from "../../app/lib/custom";
import { registerChoir, registerIndividual } from "../../app/api/api";
import { FormData } from "../../data/types";

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

  const { register, handleSubmit, watch } = useForm<FormData>();
  const selectedSong = watch("songSelected");

  const mutation = useCustomMutation(appendItem);
  const updateChoirDb = useCustomMutation(registerChoir);
  const updateIndividualDb = useCustomMutation(registerIndividual);

  const onIndividualSubmit = (data: FormData) => {
    const { fullName, phoneNumber, email, songSelected, day } = data;
    mutation.mutate({ fullName, phoneNumber, email, songSelected, day });
      updateIndividualDb.mutate({fullName, phoneNumber, email, songSelected, day})
  };

  const onChoirSubmit = (data: FormData) => {
    const { choirName, phoneNumber, email, songSelected, day } = data;
    mutation.mutate({ choirName, phoneNumber, email, songSelected, day });
    updateChoirDb.mutate({ choirName, phoneNumber, email, songSelected, day });
  };

  return (
    <div className="border rounded-2xl border-white/10 bg-black/40 p-6 backdrop-blur-md mt-7">
         
      <div className="grid gap-2">
                <Button onClick={showIndividual}>Individual</Button>     
                <Button onClick={showChoir}>Choir</Button>   
      </div>

      {individualreg ? (
        <form
          className="p-1 grid grid-cols-1 gap-1"
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

          <select
            className="w-full rounded-lg border border-white/20 bg-black/70 p-3 text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none"
            {...register("day")}
            disabled={mutation.isPending}
          >
                     
            {programmeDays.map((day) => (
              <option key={day.day} value={day.day}>
                                {day.day} - {day.date}           
              </option>
            ))}
                   
          </select>
                    <Button type="submit">Submit</Button>     
        </form>
      ) : null}
         
      {choirreg ? (
        <form
          className="p-1 grid grid-cols-1 gap-1"
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

          <select
            className="w-full rounded-lg border border-white/20 bg-black/70 p-3 text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none"
            {...register("day")}
            disabled={mutation.isPending}
          >
                     
            {programmeDays.map((day) => (
              <option key={day.day} value={day.day}>
                                {day.day} - {day.date}           
              </option>
            ))}
                   
          </select>
                    <Button type="submit">Submit</Button>     
        </form>
      ) : null}
       
    </div>
  );
}
