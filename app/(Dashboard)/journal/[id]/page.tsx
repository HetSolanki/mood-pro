import Textarea from "@/components/Textarea";
import { prisma } from "@/utils/db";

const getData = async (id) => {
  const entry = await prisma.journalEntry.findUnique({
    where: {
      id,
    },
    include: {
      analyse: true,
    },
  });

  return entry;
};

const EntryPage = async ({ params }) => {
  const { id } = await params;
  const entry = await getData(id);

  return (
    <div>
      <Textarea entry={entry} />
    </div>
  );
};
export default EntryPage;
