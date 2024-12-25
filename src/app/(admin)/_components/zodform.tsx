"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export default function ZodForm({ fields }: any) {
  // console.log(fields);
  return (
    <div>
      <form className="space-y-6 m-auto max-w-96">
        <ul className="space-y-6">
          {/* {fields.map((item: any, index: number) => (
            <li>sadsad</li>
          ))} */}
        </ul>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
