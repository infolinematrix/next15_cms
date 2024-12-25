import { deleteNodeAction } from "@/actions/admin/nodeActions";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface NodeDeleteFormProps {
  nodeId: string;
}
import { useForm } from "react-hook-form";

const NodeDeleteForm: React.FC<NodeDeleteFormProps> = ({ nodeId }) => {
  const router = useRouter();
  const form = useForm();

  const [formStatus, setFormStatus] = useState({ pending: false });

  const onSubmit = async () => {
    setFormStatus({ pending: true });
    await deleteNodeAction(nodeId);
    //-On success
    toast({
      title: "Success ",
      description: `Deleted succesfully..`,
      duration: 2000,
    });
    router.back();
    try {
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fail ",
        description: `${error.name}: ${error.message}`,
        duration: 2000,
      });
      setFormStatus({ pending: false });
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-sm">
        Are you sure you want to delete this node? This action cannot be undone.
        Deleting this node will also delete all associated data.
        <Button type="submit" variant={"link"} className="text-zz">
          Delete node
        </Button>
      </form>
    </div>
  );
};

export default NodeDeleteForm;
