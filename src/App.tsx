import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { useDogs } from "./providers/DogProviders";

export function App() {
  const { activeSelector } = useDogs();

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section>
        {activeSelector === "create" && <CreateDogForm />}
        {activeSelector !== "create" && <Dogs />}
      </Section>
    </div>
  );
}
