"use client";

import { updateUserAction } from "@/actions/admin/userActions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRoleType } from "@/db/schema/users";
import { toast } from "@/hooks/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  user: any;
  roles: UserRoleType[];
}

export const UserFormComponenet = ({ user, roles }: Props) => {
  const formSchema = z.object({
    name: z.string(),
    email: z.string(),
    role: z.string(),
    status: z.enum(["Active", "Inactive", "Suspended"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.userRole.roleIdentifier,
      status: "Active",
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    try {
      //-parse zod schema
      const monkeyParse = formSchema.safeParse(formData);
      //--validate zod schema
      if (!monkeyParse.success) {
        toast({
          variant: "destructive",
          title: "Error ",
          description: `Validation error...`,
          duration: 2000,
        });
        return;
      }

      const data = monkeyParse.data;
      const resp = await updateUserAction(data, user.id);

      toast({
        title: "Success ",
        description: `User data updated succesfully..`,
        duration: 2000,
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        variant: "destructive",
        title: "Error ",
        description: `Form submission error.. ${error}`,
        duration: 2000,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Your name here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Your email here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-[200]">
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((option: UserRoleType) => (
                        <SelectItem key={option.id} value={option.identifier}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Set role of user.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-[200]">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sttaus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Suspend">Suspend</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Status of user.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="mt-10">
          Update
        </Button>
      </form>
    </Form>
  );
};
