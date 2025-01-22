import { EntryCard } from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
  const user = await getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user?.id,
    },
  });

  return entries;
};
const JournalPage = async () => {
  const entries = await getData();

  return (
    <div className="p-6">
      <div>
        <h2 className="text-5xl font-medium mb-4">Journal</h2>
        <Question entries={entries}/>
        <div className="my-6 grid grid-cols-3 gap-2">
          <NewEntryCard />
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
