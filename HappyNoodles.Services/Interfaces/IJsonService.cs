namespace HappyNoodles.Services.Interfaces
{
    public interface IJsonService
    {
        string Serialize<T>(T obj);
        T Deserialize<T>(string json);
        Task<string> SerializeAsync<T>(T obj);
        Task<T> DeserializeAsync<T>(string json);
    }
}
