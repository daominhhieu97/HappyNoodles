public interface IRoutingKeyResolver
{
    string GetRoutingKey<T>(T message);
}
